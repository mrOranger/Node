const rows = document.getElementsByTagName('tr');
let priority = 1;

function deleteElement(index){
    let name = rows[index+1].children[0].outerText;
    let baginningDate = rows[index+1].children[1].outerText;
    let endingDate = rows[index+1].children[2].outerText;
    submitDelete('name=' + name + "&beginning=" + baginningDate + "&ending=" + endingDate, index);
}


function submitDelete(data, index){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            /* Delete the defined element */
            document.getElementById('element-'+ index).remove();
        }
    }
    xhttp.open('DELETE', '/index', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}

function add(){
    if(checkFormInput()){
        let name = document.getElementById('name-input').value;
        let startingDate = document.getElementById('starting-date-input').value;
        let endingDate = document.getElementById('ending-date-input').value;
        let description = document.getElementById('description-input').value;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let newRow = document.createElement('tr');
                let newRowName = document.createElement('td');
                let newRowStart = document.createElement('td');
                let newRowEnd = document.createElement('td');
                let newRowDescription = document.createElement('td');
                let newRowTrash = document.createElement('td');
                newRow.setAttribute('priority', priority);
                newRow.setAttribute('id', 'element-' + document.getElementsByName('tr').length);
                newRowName.innerHTML += name;
                newRowStart.innerHTML += startingDate;
                newRowEnd.innerHTML += endingDate;
                newRowDescription.innerHTML += description;
                newRowTrash.innerHTML += `<i class="fas fa-trash-alt" onClick = "deleteElement(${document.getElementsByName('tr').length})"></i>`;
                newRow.appendChild(newRowName);
                newRow.appendChild(newRowStart);
                newRow.appendChild(newRowEnd);
                newRow.appendChild(newRowDescription);
                newRow.appendChild(newRowTrash);
                document.getElementsByTagName('tbody')[0].appendChild(newRow);
            }
        }
        xhttp.open('PUT', '/index', true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('name=' + name + '&start=' + startingDate + '&end=' + endingDate + '&priority=' + priority + '&description=' + description);
    }   
}

function change(index){
    if(!document.getElementsByName('priority-'+index)[0].checked){
        document.getElementsByName('priority-'+index)[0].checked = true;
    }
    if(index == 1){
        priority = 1;
        document.getElementsByName('priority-2')[0].checked = false;
        document.getElementsByName('priority-3')[0].checked = false;
    }
    if(index == 2){
        priority = 2;
        document.getElementsByName('priority-1')[0].checked = false;
        document.getElementsByName('priority-3')[0].checked = false;
    }
    if(index == 3){
        priority = 3;
        document.getElementsByName('priority-1')[0].checked = false;
        document.getElementsByName('priority-2')[0].checked = false;
    }
}

function checkFormInput(){
    return checkField('name') && checkField ('starting-date') && checkField('ending-date') && checkField('description');
}

function checkField(identifier){
    if(document.getElementById(identifier+'-input').value != ''){
        removeErrorMessage(identifier);
        return true;
    }else{
        appendErrorMessage(identifier);
        return false;
    }
}

function appendErrorMessage(identifier){
    let element = document.getElementById(identifier + '-input');
    element.setAttribute('style', 'border: 2px solid red');
}

function removeErrorMessage(identifier){
    document.getElementById(identifier + '-input').removeAttribute('style');
}