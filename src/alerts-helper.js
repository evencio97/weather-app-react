import M from 'materialize-css';
import { v4 as uuid } from 'uuid';

export const createAlert = ({classes='alert-error', type='Error', message="", duration=3000}) => {
    // { id: , class: '', type: '', message: '' }
    const alertId = "ale-"+uuid();
    const alertHtml = '<span id="'+alertId+'" >'+
                        '<b>'+type+'!</b>'+(message && message.trim().length? " "+message:null)+
                    '</span>'
    return M.toast({html: alertHtml, classes: classes, displayLength: duration});
}

// Put in the index.html to work
// function createAlert(id) {
//     let alert = document.getElementById(id);
//     if (!alert) return;
//     var toastInstance = M.Toast.getInstance(alert);
//     toastInstance.dismiss();
// }