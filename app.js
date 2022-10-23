window.onload = function () {
    feather.replace({ 'aria-hidden': 'true' })
    let arregloData = [];
    const btnCrear = document.getElementById('btn-crear');
    const btnActualizar = document.getElementById('btn-actualizar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const titulo = document.getElementById('titulo');
    let indexActualizar;
    
    btnCrear.addEventListener('click', event => {
        let objetoDatos = {
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
    
    btnActualizar.addEventListener('click', event => {
        let nombre = document.getElementById('nombre').value;
        let usuario = document.getElementById('usuario').value;
        let correo = document.getElementById('correo').value;
        let descripcion = document.getElementById('descripcion').value;

        let datos = JSON.parse(localStorage.getItem('valores'));
        datos[indexActualizar].nombre = nombre;
        datos[indexActualizar].usuario = usuario;
        datos[indexActualizar].correo = correo;
        datos[indexActualizar].descripcion = descripcion;
        localStorage.setItem('valores', JSON.stringify(datos));
        cargaDatosGuardados();
    });

    btnCancelar.addEventListener('click', event => {
        titulo.textContent = 'Crear';
        btnCrear.classList.remove("d-none");
        btnActualizar.classList.add('d-none');
        btnCancelar.disabled = true;
        limpiar();
    });

    function limpiar(){
        let nombre = document.getElementById('nombre').value = '';
        let usuario = document.getElementById('usuario').value = '';
        let correo = document.getElementById('correo').value = '';
        let descripcion = document.getElementById('descripcion').value = '';
    }

    function cargaDatosGuardados() {
        //document.body.innerHTML = '';
        if (localStorage.getItem('valores') != null) {
            let tabla = document.getElementById('tabla').querySelector('tbody');
            tabla.innerHTML = '';
            let datos = JSON.parse(localStorage.getItem('valores'));

            id = 1;
            
            datos.forEach(function callback(element, index) {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');
                tr.dataset.index = index;
                td6.className = 'd-flex justify-content-center';
                
                let textId = document.createTextNode(id);
                let textNombre = document.createTextNode(element.nombre);
                let textUsuario = document.createTextNode(element.usuario);
                let textCorreo = document.createTextNode(element.correo);
                let textDescripcion = document.createTextNode(element.descripcion);

                //editar item
                let botonEditar = document.createElement('button');
                botonEditar.className = 'btn btn-sm mx-1 btn-warning bnt-editar';
                let textEditar = document.createTextNode('Editar');
                botonEditar.addEventListener('click', event => {
                    editar(botonEditar);
                });
                botonEditar.appendChild(textEditar);

                //eliminar item
                let botonEliminiar = document.createElement('button');
                botonEliminiar.className = 'btn btn-sm mx-1 btn-danger btn-eliminar';
                let textEliminar = document.createTextNode('Borrar');
                botonEliminiar.addEventListener('click', event => {
                    eliminar(botonEliminiar);
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
                id++;
            });
        }
        limpiar()
    }

    function editar(botonEditar){
        indexActualizar = botonEditar.parentNode.parentNode.dataset.index;
        let data = JSON.parse(localStorage.getItem('valores'))[indexActualizar];
        titulo.textContent = 'Editar';
        btnCrear.classList.add('d-none');
        btnActualizar.classList.remove("d-none");
        btnCancelar.disabled = false;

        document.getElementById('nombre').value = data.nombre;
        document.getElementById('usuario').value = data.usuario;
        document.getElementById('correo').value = data.correo;
        document.getElementById('descripcion').value = data.descripcion;
    }

    function eliminar(botonEliminiar){
        indexDatos = botonEliminiar.parentNode.parentNode.dataset.index;
        let datos = JSON.parse(localStorage.getItem('valores'));
        let filtrados = datos.filter(function(currentValue, index, arr){
            return indexDatos !=index;
        })
        localStorage.setItem('valores', JSON.stringify(filtrados));
        cargaDatosGuardados();
    }

    cargaDatosGuardados();
}