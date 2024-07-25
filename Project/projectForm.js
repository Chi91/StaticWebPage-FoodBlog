{
    "use strict";

    let form = document.forms.Form;
    let password = form.elements.password;

    let readValues = input => {
        if (input.value !== 0 && input.value !== "" && input.value !== undefined) {
            console.log(input.id + ": " + input.value);
        }
    }

    function readCheckBox() {
        let checkedBox = document.querySelectorAll("[type=radio]");
        let checkedB = "";
        for (let i = 0; i < checkedBox.length; i++) {
            if (checkedBox[i].checked) {
                checkedB = checkedBox[i].value;
                console.log("Button: " + checkedB);
            }
        }
    }

    function checkPassword() {
        if (password.value.length == "") {
            return "Passwort ist leer";
        }
        if (password.value.length > 15) {
            return "Passwort darf nicht mehr als 15 Zeichen beinhalten.";
        }
        if (password.value.length < 6) {
            return "Passwort muss länger als 8 Zeichen sein.";
        } else {
            return "Passwort ist richtig!";
        }
    }

    let messageOutput = () => {
        let message = document.createElement("p");
        message.setAttribute("id", "p1");
        let text = document.createTextNode(checkPassword(document.getElementById("password").value));
        message.appendChild(text);
        form.appendChild(message);
    }

    function changeBg(value) {
        let body = document.getElementById("body");
        body.className = value;
    }

    const hasError = field => {
        if (field.type === "submit" || field.type === "reset") return;

        let validity = field.validity;
        if (validity.valid) return;

        if (validity.valueMissing) {
            showErrorMessage(field);
        }
        if(field.type === "email" && !field.value.includes("@") ){
            showErrorMessageEmail(field);   
        }
    };

    const showErrorMessageEmail = field => {
        let message = document.createElement("p");
        let text = field.name + " bitte mit @ ausfüllen";
        message.appendChild(document.createTextNode(text));
        message.setAttribute("id", "p1");
        form.appendChild(message);
    }


    const showErrorMessage = field => {
        let message = document.createElement("p");
        let text = field.name + " bitte ausfüllen";
        message.appendChild(document.createTextNode(text));
        message.setAttribute("id", "p1");
        form.appendChild(message);
    }

    function checkInput() {
        let firstName = document.getElementById("fName");
        let lastName = document.getElementById("lName");
        let age = document.getElementById("age");
        let mail = document.getElementById("mail");
        let anleitung = document.getElementById("anleitung");

        if (firstName.checkValidity() === true && lastName.checkValidity() === true && age.checkValidity() === true && mail.checkValidity() === true && anleitung.checkValidity() === true && password.checkValidity()) {
            return true;
        }
    }

    let checkForm = () => {
        let message = document.createElement("p");
        let text = document.createTextNode("Alles wurde richtig ausgefüllt.");

        let pic = document.createElement("img");
        pic.setAttribute("id", "img1")
        pic.src = "../pics/Smile.png";
        pic.width = 120;
        pic.height = 120;

        message.appendChild(text);
        message.setAttribute("id", "p1");

        if (checkPassword() === "Passwort ist richtig!") {
            form.appendChild(message);
            form.appendChild(pic);
        }
    }

    let clear = () => {
        var p1 = document.getElementById("p1");
        var img = document.getElementById("img1");

         if (p1) {
            form.removeChild(p1);
         }

         if (img) {
            img.remove();
         }
    }

    let clearMessage = () => {
        var p1 = document.getElementById("p1");
         if (p1) {
            form.removeChild(p1);
         }
    }

    let submit = document.getElementById("submit");
    submit.addEventListener("click", function (e) {
         clearMessage();
        e.preventDefault();
         clear();
         console.clear();
        readValues(fName);
        readValues(lName);
        readValues(age);
        readValues(mail);
        readCheckBox();
        readValues(anleitung);
        readValues(volume);
        readValues(art);
        readValues(food);
        messageOutput();
        if (hasError(fName) || hasError(lName) || hasError(age) || hasError(mail) || hasError(anleitung)) {
            return;
        }
        if (checkInput() == true && checkPassword() == "Passwort ist richtig!") {
            checkForm();
            changeBg("green");
            document.getElementById("form").reset();
        }

    }, false);

    let resetForm = document.getElementById("resetForm");
    resetForm.addEventListener("click", function (e) {
        changeBg("red");
        clear();
        clearMessage();
        document.getElementById("form").reset();
    }, false);
}