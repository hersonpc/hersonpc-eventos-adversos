<template>
    <section class="nisp-cadastro-incidentes">
        <h2>Cadastro Formas de Detecção</h2>

        <div class="row">
            <div class="col-lg-12">
                <div class="input-group">
                    <input type="text" class="form-control"
                           placeholder="Informe o nome do incidente..."
                           v-model="nome">
                    <span class="input-group-btn">
                        <button class="btn btn-success" type="button" @click="add">Adicionar</button>
                    </span>
                </div>
                <br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="item in deteccao" v-bind:key="item['.key']">
                        <i class="fa fa-caret-right"></i> {{ item.nome }}
                        <button class="btn btn-danger btn-xs pull-right" @click="remove(item['.key'])" title="Remover">
                            <i class="fa fa-times"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import { nispDeteccaoDB } from './../../firebase';

    export default {
        name: "nisp-cadastro-deteccao",
        data() {
            return {
                nome: ""
            }
        },
        firebase: {
            deteccao: nispDeteccaoDB
                .orderByChild("nome")
                .limitToLast(200)
        },
        methods: {
            add() {
                var novo = {
                    nome: this.nome
                }

                nispDeteccaoDB.push(novo);

                this.nome = "";
            },
            remove(key) {
                nispDeteccaoDB.child(key).remove();
            },
        }
    }
</script>

<style scoped>
    .fa-caret-right {
        margin-right: 10px;
    }
</style>