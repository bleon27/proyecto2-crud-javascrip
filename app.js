window.onload = function () {
    let arregloData = [];
    const btnCrear = document.getElementById('crear');
    btnCrear.addEventListener('click', event => {
        let objetoDatos = {
            id: 0,
            nombre: '',
            usuario: '',
            correo: '',
            descripcion: '',
        }

        let nombre = document.getElementById('nombre').value;
        let usuario = document.getElementById('usuario').value;
        let correo = document.getElementById('correo').value;
        let descripcion = document.getElementById('descripcion').value;

        objetoDatos.nombre = nombre;
        objetoDatos.usuario = usuario;
        objetoDatos.correo = correo;
        objetoDatos.descripcion = descripcion;

        arregloData.push(objetoDatos);
        //logica del local storage
        if (localStorage.getItem('valores') == null) {
            localStorage.setItem('valores', JSON.stringify(arregloData))
        } else {
            let datos = JSON.parse(localStorage.getItem('valores'));
            datos.push(objetoDatos);

            localStorage.setItem('valores', JSON.stringify(datos));
        }
        cargaDatosGuardados();
    });

    function cargaDatosGuardados() {
        //document.body.innerHTML = '';
        if (localStorage.getItem('valores') != null) {
            let tabla = document.getElementById('tabla').querySelector('tbody');
            tabla.innerHTML = '';
            let datos = JSON.parse(localStorage.getItem('valores'));

            datos.forEach(element => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');
                
                let textId = document.createTextNode(element.id+1);
                let textNombre = document.createTextNode(element.nombre);
                let textUsuario = document.createTextNode(element.usuario);
                let textCorreo = document.createTextNode(element.correo);
                let textDescripcion = document.createTextNode(element.descripcion);

                let botonEditar = document.createElement('button');
                botonEditar.className = 'btn btn-warning';
                let textEditar = document.createTextNode('Editar');
                botonEditar.addEventListener('click', event => {
                    alert('Editar');
                });
                botonEditar.appendChild(textEditar);

                let botonEliminiar = document.createElement('button');
                botonEliminiar.className = 'btn btn-danger';

                let textEliminar = document.createTextNode('Borrar');
                botonEliminiar.addEventListener('click', event => {
                    alert('eliminar');
                });
                botonEliminiar.appendChild(textEliminar);

                td1.appendChild(textId);
                td2.appendChild(textNombre);
                td3.appendChild(textUsuario);
                td4.appendChild(textCorreo);
                td5.appendChild(textDescripcion);
                td6.appendChild(botonEditar);
                td6.appendChild(botonEliminiar);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);

                tabla.insertAdjacentElement("beforeend", tr);
                //tabla.appendChild(tabla);

            });
        }
    }
    cargaDatosGuardados();
}