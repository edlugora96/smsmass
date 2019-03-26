import { fetchServer, fetchGetServer, fetchPutServer } from '$utils/fetchServer';
import { saveLogin } from '$redux/store';

const excResp = ({values, res, sign, verify}) => {
  if (res.status === 200 && verify) {
    return {status:res.status, message:res.body.message};
  } else if (res.status === 200 && !verify) {
    saveLogin(res.body.token);
    localStorage.setItem('auth', res.body.token);
    return {status:res.status, message:res.body.message};
  } else if(sign && res.status !== 200) {
    localStorage.removeItem('auth');
    saveLogin(null);
    return {status:res.status, message:res.response.body.message};
  } else if(res.status === 200) {
    localStorage.removeItem('auth');
    saveLogin(null);
    return {status:res.status, message:res.body.message};
  } else {
    return {status:res.status, message:res.response.body.message};
  }
};

class Auth {
  constructor(){
    this.status = false;
  }
  async login(values){
    const res = await fetchServer('users/login', values, true);
    return excResp({values, res});
  }
  async signup(values){
    const res = await fetchServer('users/signUp', values, true);
    return excResp({values, res});
  }
  async update(values, id ){
    const res = await fetchPutServer('users/update/'+values._id, values);
    return excResp({values, res});
  }
  async uploadFile(values){
    const res = await fetchServer('users/manageUpload', values, true);
    return excResp({values, res});
  }
  async verifications(values){
    const res = await fetchServer('sms/verify/'+values.toValidate, values);
    return excResp({values, res, verify:true});
  }
  async logout(){
    let res = await fetchGetServer('users/logout');
    if (res) {
     localStorage.removeItem('auth');
     saveLogin(null);
     this.status = false;
     return this.status;
   }

  }
  async verify(){
    let res = await fetchGetServer('users/isauth');
    if (res.status === 200) {
      this.status = true;
      return this.status;
    }
    else {
      this.status = false;
      return this.status;
    }
  }
}
const LocalAuth = new Auth();
export default LocalAuth;