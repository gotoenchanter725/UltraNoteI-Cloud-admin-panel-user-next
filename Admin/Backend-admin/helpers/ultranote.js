module.exports = UltraNote;

const http = require('http');
const https = require('https');

const MAX_MIXIN = 10;
const MIN_MIXIN = 2;
const DEFAULT_UNLOCK_HEIGHT = 0;
const DEFAULT_FEE = 10; // raw X
const DEFAULT_CHARACTER_FEE = 10; // raw X

const err = {
    nonNeg: ' must be a non-negative integer',
    hex: ' must be a hexadecimal string',
    opts: 'opts must be object',
    hex64: ' must be 64-digit hexadecimal string',
    addr: ' must be 98-character string beginning with xuni',
    raw: ' must be a raw amount of XUNI (X)',
    trans: ' must be a transfer object { address: 98-character string beginning with xuni, amount: raw amount of XUNI (X), message: optional string }',
    arr: ' must be an array',
    str: ' must be a string'
};

function UltraNote(host, walletRpcPort, daemonRpcPort, timeout) {
    if (!host) throw 'host required';
    const parse = host.match(/^([^:]*):\/\/(.*)$/);
    if (parse[1] === 'http') this.protocol = http;
    else if (parse[1] === 'https') this.protocol = https;
    else throw 'host must begin with http(s)://';
    this.host = parse[2];
    this.walletRpcPort = walletRpcPort;
    this.daemonRpcPort = daemonRpcPort;
    this.timeout = timeout || 5000;
}

UltraNote.prototype.getTransaction = function (hash) {
    return new Promise((resolve, reject) => {
        if (!isHex64String(hash)) reject('hash' + err.hex64);
        else wrpc(this, 'getTransaction', { transactionHash: hash }, resolve, reject);
    });
}

UltraNote.prototype.sendTransaction = function (opts) {
    return new Promise((resolve, reject) => {
      if (!isObject(opts)) reject(err.opts);
      else if (isUndefined(opts.transfers) || !arrayTest(opts.transfers, isTransfer)) reject('transfers' + err.arr + ' of transfers each of which' + err.trans);
      else if (!isUndefined(opts.addresses) && !arrayTest(opts.addresses, isAddress)) reject('addresses' + err.arr + ' of addresses each of which' + err.addr);
      else if (!isUndefined(opts.changeAddress) && !isAddress(opts.changeAddress)) reject('changeAddress' + err.addr);
      else if (!isUndefined(opts.paymentId) && !isHex64String(opts.paymentId)) reject('paymentId' + err.hex64);
      else if (!isUndefined(opts.extra) && !isString(opts.extra)) reject('extra' + err.str);
      else {
        opts.sourceAddresses = opts.addresses; delete opts.addresses;
        if (isUndefined(opts.mixIn)) opts.mixIn = MIN_MIXIN;
        if (!(opts.mixIn >= MIN_MIXIN && opts.mixIn <= MAX_MIXIN)) reject(MIN_MIXIN + ' <= mixIn <= ' + MAX_MIXIN);
        else {
          opts.anonymity = opts.mixIn; delete opts.mixIn;
          if (isUndefined(opts.unlockHeight)) opts.unlockHeight = DEFAULT_UNLOCK_HEIGHT;
          if (!isNonNegative(opts.unlockHeight)) reject('unlockHeight' + err.nonNeg);
          else {
            opts.unlockTime = opts.unlockHeight; delete opts.unlockHeight;
            if (isUndefined(opts.fee)) {
              opts.fee = DEFAULT_FEE;
              opts.transfers.forEach((transfer) => {
                opts.fee += (!isUndefined(transfer.message) ? transfer.message.length * DEFAULT_CHARACTER_FEE : 0);
              });
            }
            if (!isNonNegative(opts.fee)) reject('fee' + err.raw);
            else wrpc_send(this, 'sendTransaction', opts, resolve, reject);
          }
        }
      }
    });
  };

UltraNote.prototype.toHexString = function(number) {
    var big_hex = (number >> 24) >> 8;
    big_hex = (((big_hex>>24)&0xff) |       // byte 3 to byte 0
                    ((big_hex<<8)&0xff0000) |    // byte 1 to byte 2
                    ((big_hex>>8)&0xff00) |      // byte 2 to byte 1
                    ((big_hex<<24)&0xff000000)) >>> 0;
    var little_hex = (((number>>24)&0xff) |       // byte 3 to byte 0
                    ((number<<8)&0xff0000) |    // byte 1 to byte 2
                    ((number>>8)&0xff00) |      // byte 2 to byte 1
                    ((number<<24)&0xff000000)) >>> 0;
    var pad = "00000000";
    var little_hex_str = little_hex.toString(16);
    little_hex_str = pad.substring(0, pad.length - little_hex_str.length) + little_hex_str;
    var big_hex_str = big_hex.toString(16);
    big_hex_str = pad.substring(0, pad.length - big_hex_str.length) + big_hex_str;
    var hex_string = little_hex_str + big_hex_str;
    return hex_string;
}

function request(protocol, host, port, timeout, post, path, resolve, reject) {
    const obj = {
        hostname: host,
        port: port,
        method: 'POST',
        timeout: timeout,
        path: path,
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': post.length,
        }
    };
    var doRequest = protocol.request(
        obj,
        (res) => {
        let data = Buffer.alloc(0);
        res.on('data', (chunk) => { data = Buffer.concat([data, chunk]); });
        res.on('end', () => {
            data = data.toString();
            if (data.result) data = data.result;
            resolve(data);
        });
        }
    );
    
    doRequest.on('error', (error) => {
        reject('RPC server error');
    });
    
    doRequest.on('timeout', () => {
        reject("RFC timeout");
        doRequest.abort();
    });
    
    doRequest.end(post);
}

function request_send(protocol, host, port, timeout, post, path, resolve, reject) {
    const obj = {
      hostname: host,
      port: port,
      method: 'POST',
      timeout: timeout,
      path: path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post.length,
      }
    };
    var doRequest = protocol.request(
      obj,
      (res) => {
        let data = Buffer.alloc(0);
        res.on('data', (chunk) => { data = Buffer.concat([data, chunk]); });
        res.on('end', () => {
          try {
            data = JSON.parse(data.toString());
            if (data.error) { reject(data.error.message); return; }
          } catch (error) { reject(error.message); return; }
          if (data.result) data = data.result;
          resolve(data, post);
        });
      }
    );
  
    doRequest.on('error', (error) => {
      reject('RPC server error');
    });
  
    doRequest.on('timeout', () => {
      reject("RFC timeout");
      doRequest.abort();
    });
  
    doRequest.end(post);
  }

function wrpc(that, method, params, resolve, reject) {
    request(that.protocol, that.host, that.walletRpcPort, that.timeout, buildRpc(method, params), '/json_rpc', resolve, reject);
}

function wrpc_send(that, method, params, resolve, reject) {
    let rpc = buildRpc(method, params);
    var msg_json = JSON.stringify(params.transfers[0].message);
    rpc = rpc.replace(/\\n/g,'\n');
    request_send(that.protocol, that.host, that.walletRpcPort, that.timeout, rpc, '/json_rpc', resolve, reject);
}

function arrayTest(arr, test) {
    if (!Array.isArray(arr)) return false;
    let i;
    for (i = 0; i < arr.length; i++) { if (!test(arr[i])) break; }
    if (i < arr.length) return false;
    return true;
  }
  
  function isObject(obj) { return typeof obj === 'object'; }
  
  function isUndefined(obj) { return typeof obj === 'undefined'; }
  
  function isString(obj) { return typeof obj === 'string'; }
  
  function isTransfer(obj) {
    if (!isObject(obj) || !isAddress(obj.address) || !isNonNegative(obj.amount)) return false;
    if (typeof obj.message !== 'undefined' && !isString(obj.message)) return false;
    return true;
  }
  
  function isNonNegative(n) { return (Number.isInteger(n) && n >= 0); }
  
  function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
  
  function isAddress(str) { return (typeof str === 'string' && str.length === 99 && str.slice(0, 4) === 'Xuni'); }
  
  function isHex64String(str) { return (typeof str === 'string' && /^[0-9a-fA-F]{64}$/.test(str)); }
  
  function isHexString(str) { return (typeof str === 'string' && !/[^0-9a-fA-F]/.test(str)); }
  
  function buildRpc(method, params) { return '{"jsonrpc":"2.0","id":"0","method":"' + method + '","params":' + JSON.stringify(params) + '}'; }
  
