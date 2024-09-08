function sendMail(){
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value
    
    }
    const serviceID = "service_vziw9qr"
    const templateID = "template_0lfmwhl"

    emailjs.send(serviceID,templateID, params)
    .then((res)=>{
            document.getElementById("name").value = "name";
            document.getElementById("email").value = "email";
            document.getElementById("message").value= "message";
            document.getElementById("phone").value= "phone";
            console.log(rs);
            alert("your message sent successfully");
        })
    .catch((err) => console.log(err));
}