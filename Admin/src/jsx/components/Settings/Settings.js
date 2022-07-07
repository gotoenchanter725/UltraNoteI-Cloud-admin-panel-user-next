import React, { Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { Toast } from "react-bootstrap";
const FormFields = [
    {caption: "RPC Host:", fieldName: "rpcHost", isRequired: true, type: 'text'},
    {caption: "Daemon RPC Port:", fieldName: "daemonRpcPort", isRequired: true, type: 'text'},
    {caption: "Wallet RPC Port:", fieldName: "walletRpcPort", isRequired: true, type: 'text'},
    {caption: "RPC User:", fieldName: "rpcUser", isRequired: true, type: 'text'},
    {caption: "RPC Password:", fieldName: "rpcPassword", isRequired: true, type: 'text'}
];
var currentValues={
    rpcHost:'',
    rpcUser:'',
    rpcPassword: ''
};
const SettingsComponent = (props) => {
   const [RPCSettings, setRPCSettings] = useState(currentValues);
   const [changesUpdateResult, setChangesUpdateResult] = useState('');
   const [balance, setBalance] = useState(0);
   const [balanceMessage, setBalanceMessage] = useState('');
   const [blockStatus, setBlockStatus] = useState({blockCount:0, knownBlockCount: 0, peerCount:0});
   const [showToast, setShowToast] = useState(false);
   const [toastMessage, setToastMessage] = useState('');
 
   const {
    register,
    handleSubmit,
    formState,
    setValue,
  } = useForm({defaultValues: RPCSettings});
  
  const requestSettings = async ()=>{
    let response = await axios.get(props.portalURL+'api/wallets/rpcsettings/', { headers: { Authorization: props.token.token, "Content-Type": "application/json" }});
    if(response.status===200)
      setRPCSettings(response.data);
   }

  const requestBalance = async ()=>{
    const walletAddress = 'XuniiezpineJ8GUmZiSK2bZ9jfHHqPe42YgbS6Y82KXrSeSzdHiQz9J8SsJcum2ss3Udb2ry7noaoRzY1L1F6Hie6gfY7SLNsBY';
    try{
    let response = await axios.get(props.portalURL+'api/wallets/balance/'+walletAddress, { headers: { Authorization: props.token.token, "Content-Type": "application/json" }});
    if(response && response.status === 200)
      setBalance(response.data.availableBalance/1000000);
      setBalanceMessage('');
    }catch(err) {
      setBalance(0);
      setBalanceMessage('Unknown address or error getting balance.');
    }   
  }
  const requestStatus = async ()=>{
    try{
      let response = await axios.get(props.portalURL+'api/wallets/status', { headers: { Authorization: props.token.token, "Content-Type": "application/json" }});
      if(response && response.status === 200)
        setBlockStatus(response.data);
      }catch(err) {
        console.log('settings.requestStatus.catch:', err);
      }   
  }

  useEffect(()=>{
    const func=async ()=>{
      await requestSettings();
      await requestBalance();
      await requestStatus();
    }

    func();
  },[]);
  useEffect(()=>{
    setValue("rpcHost", RPCSettings.rpcHost);
    setValue("rpcUser", RPCSettings.rpcUser);
    setValue("rpcPassword", RPCSettings.rpcPassword);
    setValue("daemonRpcPort", RPCSettings.daemonRpcPort);
    setValue("walletRpcPort", RPCSettings.walletRpcPort);
  },[RPCSettings]);

  const onSubmit = async (data)=>{
      try {
      let response = await axios.post(props.portalURL+'api/wallets/rpcsettings/',{rpcSettings: data}, { headers: { Authorization: props.token.token, "Content-Type": "application/json" }});
      let resultStr = response && response.status===200 ? 'Update successfull.': 'Update failed...';
      setToastMessage(resultStr);
      setShowToast(true);
      
      await requestSettings();
      // console.log('result:', resultStr);
      }
      catch(err) {
        setChangesUpdateResult('Error updating data:', err);
      }

  }
  useEffect(()=>{
      // console.log('form state:', formState.dirtyFields);
      // if(formState.isDirty) setChangesUpdateResult('');
  },[formState]);

  let errors = formState.errors;
  return (
    <Fragment>
      <PageTitle activeMenu="Settings" motherMenu="App" />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
          <div style={{margin: '20px'}}>
                <h4 className="card-title text-right">
                   Balance:{" "}
                  <span className="text-success">
                    {balance || "0"}
                  </span>{" "}
                  XUNI
                </h4>
                <p style={{textAlign: 'right'}}>
                  <small> {balanceMessage} </small>
                </p>
                <h4 className="card-title text-right">
                  Block Count:{" "+ blockStatus.blockCount || "0"}
                </h4>
                <h4 className="card-title text-right">
                  Known Block Count:{" "+ blockStatus.knownBlockCount || "0"}
                </h4>
                <h4 className="card-title text-right">
                  Peer Count:{" "+ blockStatus.peerCount || "0"}
                </h4>
              </div>
            <div className="card-body">
              <div className="form-group row">
                {FormFields.map((ff, index)=>{
                    return InputField({...ff, register, errors});
                })}
                </div>
                <div className="form-group row">
                <div className="form-group col-md-12"> 
                <button className="btn btn-primary" type="submit" onClick={handleSubmit(onSubmit)}>
                  Update
                </button>
                </div>
                <Toast onClose={() => setShowToast(false)} className="d-inline-block m-1" bg="primary" show={showToast} delay={3000} autohide>
                <Toast.Body style={{background:'#5a387a'}}>{toastMessage}</Toast.Body>
                </Toast>
                </div>

           </div>  
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const InputField = ({register, caption, fieldName, errors, isRequired, type}) =>{
    return (<div className="form-group col-md-12" key={fieldName}>
                                <label>{caption}</label>
                                <input
                                  type={type}
                                  {...register(fieldName, { required: isRequired })}
                                  placeholder={caption}
                                  className="form-control"
                                />
                                {errors && errors[fieldName] && (
                                  <span>{}</span>
                                )}
                              </div>);
}

export default SettingsComponent;
