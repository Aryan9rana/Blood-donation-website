
function sendMail(){
var params={
        name:document.getElementById('form-name').value,
        email:document.getElementById('form-email').value,
        phone:document.getElementById('form-phone').value,
        subject:document.getElementById('form-subject').value,
        message:document.getElementById('form-desc').value
}
const serviceID ="service_1zp43d9";
const templateID ="template_do1g9ur"

emailjs.send(serviceID,templateID,params)
.then(
    res=>{
        document.getElementById('form-name').value="";
        document.getElementById('form-email').value="";
        document.getElementById('form-phone').value="";
        document.getElementById('form-subject').value="";
        document.getElementById('form-desc').value="";

        console.log(res);
        alert("your message was sent succesfully")
    }).catch(err=>console.log(err));
}
