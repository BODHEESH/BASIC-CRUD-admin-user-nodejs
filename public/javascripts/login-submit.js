


const form = document.querySelector("#form");

form.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const email = form.email.value;
    const password = form.password.value

   
      try{

    const res = await fetch('/user/login',{
            method:"POST",
            body:JSON.stringify({email:email,password:password}),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
              },
              credentials: "same-origin"
        });

        const data = await res.json();
        console.log(data);
    }catch(err){
        // console.log(err);
    }
})

