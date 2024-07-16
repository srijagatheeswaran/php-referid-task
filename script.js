function submitfun(event) {
    event.preventDefault();
  var uname = document.getElementById('name').value;
  var referId = document.getElementById('dropdown').value;
  var amount = document.getElementById('amount').value;
  let register = true;
  if (uname.length <= 0) {
      document.querySelector('.error').innerHTML = "Name is required";
      register = false;
  } else {
      document.querySelector('.error').innerHTML = "";
      if (amount.length <= 0) {
        document.querySelector('.error').innerHTML = "Amount is required";
        register = false;
    } else {
        document.querySelector('.error').innerHTML = "";
        if (!/^\d+$/.test(amount)) {
            document.querySelector('.error').innerHTML = 'Amount must be a valid number';
            register = false;

          }
        else{
             document.querySelector('.error').innerHTML = "";

        }
    }
  }

  

  if (register) {
      let xhttp = new XMLHttpRequest();
      let error = document.getElementById('errReg');
      let params = "name=" + encodeURIComponent(uname) + "&refer_id=" + encodeURIComponent(referId) + "&amount=" + encodeURIComponent(amount);

      xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);


              if (response.status == "error") {
                  console.log("Error occurred");
                  error.innerHTML = response.message;
                  error.style.color = "red";
              } else if (response.status == "success") {
                  console.log("Register success");
                  error.innerHTML = response.message;
                  error.style.color = "green";
              }
          }
      };

      xhttp.open("POST", "list.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(params);
       document.getElementById('name').value =""
       document.getElementById('dropdown').value=""
       document.getElementById('amount').value=""
    show()
  }
}
function show() {
    fetch('index.php')
      .then(response => response.json())
      
      .then(data => {
        const dropdown = document.getElementById('dropdown');
        dropdown.innerHTML="";
        dropdown.innerHTML = '<option selected value="-">Select an option</option>'
        data.forEach(entry => {
          const option = document.createElement('option');
          option.value = entry.user_id;
          option.textContent = entry.user_id;
          dropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching user IDs:', error));
  }
show()
