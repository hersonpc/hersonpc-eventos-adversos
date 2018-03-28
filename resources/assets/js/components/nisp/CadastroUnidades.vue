<template>
    <section class="cadastro-unidades">
        <h2>Cadastro Unidades</h2>

        <div class="row">
            <div class="col-lg-12">
                <div class="input-group">
                    <input type="text" class="form-control"
                           placeholder="Informe o nome da unidade de internação..."
                           v-model="unidade.nome">
                    <span class="input-group-btn">
                        <button class="btn btn-success" type="button" @click="add">Adicionar</button>
                    </span>
                </div>
                <br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="item in unidades" v-bind:key="item['.key']">
                        <i class="fa fa-caret-right"></i> {{ item.nome }}
                        <button class="btn btn-danger btn-xs pull-right"
                                @click="remove(item['.key'])" title="Remover"><i class="fa fa-times"></i></button>
                    </li>
                </ul>

            </div>

            <div class="col-lg-6">
            </div>
        </div>
    </section>
</template>

<script>
    import { unidadesDB } from '../../firebase';

    export default {
        name: "cadastro-unidades",
        data() {
            return {
                unidade: {
                    nome: ""
                }
            }
        },
        firebase: {
            unidades: unidadesDB
                .orderByChild("nome")
                .limitToLast(200)
        },
        methods: {
            add() {
                var unidade = {
                    nome: this.unidade.nome
                }

                unidadesDB.push(unidade);
            },
            remove(key) {
                unidadesDB.child(key).remove();
            },
        }
    }
</script>

<style scoped>
    .fa-caret-right {
        margin-right: 10px;
    }
</style>