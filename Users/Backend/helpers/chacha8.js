const INT32 = Math.pow(2, 32);

class Chacha8 {
    constructor(key, iv, data, totalDataLength = 0) {

        if(iv.length != Chacha8.CHACHA8_IV_SIZE){
            throw new Error('wrong nonce length (needs to be ' + Chacha8.CHACHA8_IV_SIZE+')');
        }

        let i;
        let rounds = 20;
        let length = totalDataLength ? totalDataLength : data.length;
        let sigma = new Int32Array([0x65, 0x78, 0x70, 0x61, 0x6e, 0x64, 0x20, 0x33, 0x32, 0x2d, 0x62, 0x79, 0x74, 0x65, 0x20, 0x6b]);
        let x = new Int32Array(16);
        let j = new Int32Array(16);
        let cipher = new Int32Array(length);
        let cipherP = 0;

        
        for (i = 0; i < 4; i++) {
            j[i] = this.u8to32_little(sigma, i * 4);
        }

        for (i = 0; i < 8; i++) {
            j[i + 4] = this.u8to32_little(key, i * 4);
        }
        j[12] = 0;
        j[13] = 0;
        j[14] = this.u8to32_little(iv, 0);
        j[15] = this.u8to32_little(iv, 4);

        while(true) {
            x = j.slice();

            for (i = rounds; i > 0; i -= 2) {
                this.quarterRound(x, 0, 4, 8, 12);
                this.quarterRound(x, 1, 5, 9, 13);
                this.quarterRound(x, 2, 6, 10, 14);
                this.quarterRound(x, 3, 7, 11, 15);
                this.quarterRound(x, 0, 5, 10, 15);
                this.quarterRound(x, 1, 6, 11, 12);
                this.quarterRound(x, 2, 7, 8, 13);
                this.quarterRound(x, 3, 4, 9, 14);
            }

            for (i = 0; i < 16; i++) {
                x[i] = this.plus32(x[i], j[i]);
            }

            for (i = 0; i < 16; i++) {
                x[i] = x[i] ^ this.u8to32_little(data, i * 4);
            }

            j[12] = this.plus32(j[12], 1);

            if (!j[12]){
                j[13] = this.plus32(j[13], 1);
            }

            for (i = 0; i < 16; i++) {
                this.u32to8_little(cipher, cipherP + i * 4, x[i]);
            }

            if (length <= 64) {
                return cipher;
            }
            length -= 64;
            cipherP += 64;
            data = data.slice(64);
        }
    }

    plus32(a,b){
        return (a + b) % INT32;
    }

    u8to32_little(x, i) {
        return x[i] | (x[i + 1] << 8) | (x[i + 2] << 16) | (x[i + 3] << 24);
    }

    u32to8_little(x, i, u) {
        x[i] = u & 0xff;
        u >>>= 8;
        x[i + 1] = u & 0xff;
        u >>>= 8;
        x[i + 2] = u & 0xff;
        u >>>= 8;
        x[i + 3] = u & 0xff;
    }
    
    rotate(v, c) {
        return (v << c) | (v >>> (32 - c));
    }

    quarterRound(x, indexA, indexB, indexC, indexD) {
        x[indexA] = this.plus32(x[indexA], x[indexB]);
        x[indexD] = this.rotate(x[indexD] ^ x[indexA], 16);
        x[indexC] = this.plus32(x[indexC], x[indexD]);
        x[indexB] = this.rotate(x[indexB] ^ x[indexC], 12);
        x[indexA] = this.plus32(x[indexA], x[indexB]);
        x[indexD] = this.rotate(x[indexD] ^ x[indexA], 8);
        x[indexC] = this.plus32(x[indexC], x[indexD]);
        x[indexB] = this.rotate(x[indexB] ^ x[indexC], 7);
    }
}

Chacha8.CHACHA8_IV_SIZE = 8;

module.exports = Chacha8;