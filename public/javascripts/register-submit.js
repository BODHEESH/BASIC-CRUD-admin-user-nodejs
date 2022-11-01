



const form = document.querySelector("#form");
const error = document.getElementById("error-msg")


form.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value

    error.innerText ="";
   
      try{

    const res = await fetch('/user/register',{
            method:"POST",
            body:JSON.stringify({name:name,email:email,password:password}),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
              },
              credentials: "same-origin"
        });

        const data = await res.json();
        console.log(data.error);

        error.innerText = data.error.message;



    }catch(err){
        // console.log(err);
    }
})