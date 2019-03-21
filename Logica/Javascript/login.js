var usuario= document.getElementById("user");
var contrasenia= document.getElementById("password");
var login= document.getElementById("login");
var url=window.location;
login.addEventListener("click", entrar);

function entrar() {
	u= usuario.value;
	c= contrasenia.value;
        
        var xhr= XMLHttpRequest();
        xhr.open("GET","login.php?user="+usuario,true);
        xhr.onreadystatechange= function (){
            if(xhr.readyState===4 && xhr.status===200){
                alert(xhr.responseText);
            }
        }
        xhr.send(null);
	
}