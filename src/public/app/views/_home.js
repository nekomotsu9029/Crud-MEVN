const _home = {
    data(){
        return{
            arrTask: [],
            urlApi: 'http://localhost:3000/api/task',
            formData: {
                name: '',
                description: ''
            },
            editData:{
                name: '',
                description: ''
            },
            messageServer: ''
        }
    },
    methods: {
        obtenerTareaPorId: function(_id){
            for(var i=0; i<this.arrTask.length; i++){
                if(this.arrTask[i]._id==_id){
                    return this.arrTask[i];
                }
            }
            return -1;
        },
        actualizarCamposDelModal: function(_id){
            let taskTemp = this.obtenerTareaPorId(_id);
            this.editData.name = taskTemp.name;
            this.editData.description = taskTemp.description;
        },
        obtenerTareas: function(){
            axios.get(this.urlApi)
                .then(response => {
                    this.arrTask = response.data.tasks;
                })
        },
        guardarTarea: function(){

            axios.post(this.urlApi, this.formData)
            .then(response => {
                this.messageServer = response.data;
                this.obtenerTareas();
                this.formData.name = '';
                this.formData.description = '';
            })

        },
        editarTarea: function(_id){

            axios.put(this.urlApi+'/'+_id, this.editData)
            .then(response => {
                this.messageServer = response.data;
                this.obtenerTareas()
            })

        },
        eliminarTarea: function(_id){

            axios.delete(this.urlApi+'/'+_id)
            .then(response => {
                this.messageServer = response.data;
                this.obtenerTareas()
            })
            
        }
    },
    mounted () {
      this.obtenerTareas();
      this.messageServer = 'oli bb';
    },
    template: //html
    `
        <div class="row mt-4">
            <div class="col-md-12 alert alert-dark text-dark mt-3 mb-5" role="alert">El servidor dice: {{messageServer}}</div>
            <div class="col-md-5">
                <div class="card p-2">
                    <h4 class="mb-2 text-center">Nueva Tarea</h4>
                    <form v-on:submit.prevent="guardarTarea">
                        <div class="form-group">
                            <input v-model="formData.name" class="form-control" placeholder="Nombre de la tarea" name="name" >
                        </div>
                        <div class="form-group">
                            <textarea v-model="formData.description" class="form-control" placeholder="Descripcion de la tarea" name="description" ></textarea>
                        </div>
                        <button class="btn btn-block btn-outline-info">Guardar</button>
                    </form>
                </div>
            </div>
            <div class="col-md-7">
                <ul>
                    <li class="card card-body container mt-2" v-for="(item, index) of arrTask" >
                        <div class="row">
                            <div class="col-md-8">
                                nombre: {{item.name}} <br> Descripcion: {{item.description}}
                            </div>
                            <div class="col-md-4 pt-1">
                                <a v-on:click="actualizarCamposDelModal(item._id)" href="#" class="btn btn-success" data-toggle="modal" :data-target="'#demo' + item._id">editar</a>
                                <a v-on:click="eliminarTarea(item._id)" href="#" class="btn btn-danger">eliminar</a>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" :id="'demo' + item._id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Editar la Tarea {{item.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body card">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <input v-model="editData.name" class="form-control" placeholder="Nombre de la tarea" name="name" >
                                        </div>
                                        <div class="form-group">
                                            <textarea v-model="editData.description" class="form-control" placeholder="Descripcion de la tarea" name="description" ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                <button v-on:click="editarTarea(item._id)" type="button" class="btn btn-block btn-outline-info">Actualizar Tarea</button>
                                </div>
                            </div>
                            </div>
                            </div>

                        </div>
                        
                    </li>
                    <li v-if="arrTask.length === 0">
                    No hay tareas
                    </li>
                </ul>
            </div>
        </div>
    `
}

export default _home