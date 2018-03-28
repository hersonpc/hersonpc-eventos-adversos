<template>
    <section class="col-xs-12 notificacoes">
        <h3><strong>Sistema de Segurança do Paciente</strong></h3>

        <tabs v-model="activeTab" nav-style="tabs" justified>
            <tab header="Atendimentos">
                <div class="row">
                    <div class="col-lg-12">

                        <div class="table-responsive">
                            <table class="table table-striped">
                                <!--<caption>Listagem das notificações registradas</caption>-->
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Atendimento</th>
                                    <th>Data</th>
                                    <th>Prontuário</th>
                                    <th>Nome paciente</th>
                                    <th>Nome mãe</th>
                                    <th>Dt.Nasc.</th>
                                    <th>Unidade</th>
                                    <th>Leito</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in atendimentosOrdered" v-bind:key="item['.key']">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ item.atendimento }}</td>
                                    <td>{{ item.data_atendimento }}</td>
                                    <td>{{ item.codigo_paciente }}</td>
                                    <td>{{ item.nome }}</td>
                                    <td>{{ item.nome_mae }}</td>
                                    <td>{{ item.data_nascimento }}</td>
                                    <td>{{ item.unidade }}</td>
                                    <td>{{ item.leito }}</td>
                                    <td>
                                        <button class="btn btn-xs btn-danger" @click="setup(item.atendimento)" title="Notificar">
                                            <i class="fa fa-exclamation-triangle"></i> Notificar</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </tab>
            <tab header="Notificar">
                <div v-show="notificar <= 0">
                    <h3>Selecione o tipo de notificação</h3>
                    <div class="col-sm-12">
                        <div class="col-xs-12 col-sm-3" v-for="(item, index) in incidentes">
                            <button class="btn btn-default btn-block" @click="iniNotificar(index +1, item.nome)">
                                <i class="fa fa-4x fa-exclamation-triangle text-danger"></i><br> <strong>{{ item.nome }}</strong>
                            </button>
                        </div>

                    </div>
                </div>

                <div v-show="notificar > 0">
                    <h3>Formulário de notificação</h3>
                    <form v-on:submit.prevent="onSubmit">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="edtAtendimento">Código do atendimento</label>
                                <input type="text" class="form-control" id="edtAtendimento"
                                       placeholder="Informe somente números"
                                       @keyup.enter.native="localizar"
                                       v-model="codigoPesquisa">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <label for="edtPacienteNome">Nome do paciênte</label>
                                <input type="text" class="form-control" id="edtPacienteNome"
                                       v-model="notificacao.atendimento.nome"
                                       readonly>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtPacienteDN">Data de nascimento</label>
                                <input type="text" class="form-control" id="edtPacienteDN"
                                       v-model="notificacao.atendimento.data_nascimento"
                                       readonly>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="edtPacienteMae">Nome da mãe</label>
                                <input type="text" class="form-control" id="edtPacienteMae"
                                       v-model="notificacao.atendimento.nome_mae"
                                       readonly>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtPacienteUnidade">Unidade de internação</label>
                                <input type="text" class="form-control" id="edtPacienteUnidade"
                                       v-model="notificacao.atendimento.unidade"
                                       readonly>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtPacienteLeito">Leito</label>
                                <input type="text" class="form-control" id="edtPacienteLeito"
                                       v-model="notificacao.atendimento.leito"
                                       readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="edtIncidente">Tipo do incidente</label>
                                <select class="form-control" id="edtIncidente" v-model="notificacao.incidente">
                                    <option></option>
                                    <option v-for="item in incidentes" :value="item.nome">{{ item.nome }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtIncidente">Detecção</label>
                                <select class="form-control" id="edtIncidente" v-model="notificacao.deteccao">
                                    <option></option>
                                    <option v-for="item in deteccao" :value="item.nome">{{ item.nome }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtOnde">Onde ocorreu</label>
                                <select class="form-control" id="edtOnde" v-model="notificacao.onde">
                                    <option></option>
                                    <option v-for="item in unidades" :value="item.nome">{{ item.nome }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtGrauDano">Grau do dano do incidente</label>
                                <select class="form-control" id="edtGrauDano" v-model="notificacao.grauDano">
                                    <option></option>
                                    <option v-for="item in grauDano" :value="item.nome">{{ item.nome }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="edtIncidenteData">Data da ocorrência</label>
                                <input type="text" id="edtIncidenteData" class="form-control"
                                       v-model="notificacao.data" placeholder="dd/mm/yyyy">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="edtIncidente">Período</label>
                                <select class="form-control" id="edtPeriodo" v-model="notificacao.periodo">
                                    <option value="Matutino">Matutino (7h ~ 13h)</option>
                                    <option value="Vespertino">Vespertino (13h ~ 19h)</option>
                                    <option value="Noturno">Noturno (19h ~ 7h)</option>
                                </select>
                            </div>

                        </div>
                        <div class="form-group col-md-12">
                            <label for="inputFato">O que ocorreu (detalhamento / características do incidente)</label>
                            <textarea name="fato" id="inputFato" cols="30" rows="8" class="form-control"></textarea>
                        </div>
                        <!--<div class="form-row">-->
                        <!--<div class="form-group col-md-6">-->
                        <!--<label for="inputCity">City</label>-->
                        <!--<input type="text" class="form-control" id="inputCity">-->
                        <!--</div>-->
                        <!--<div class="form-group col-md-4">-->
                        <!--<label for="inputState">State</label>-->
                        <!--<select id="inputState" class="form-control">-->
                        <!--<option selected>Choose...</option>-->
                        <!--<option>...</option>-->
                        <!--</select>-->
                        <!--</div>-->
                        <!--<div class="form-group col-md-2">-->
                        <!--<label for="inputZip">Zip</label>-->
                        <!--<input type="text" class="form-control" id="inputZip">-->
                        <!--</div>-->
                        <!--</div>-->
                        <div class="form-group col-md-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck">
                                <label class="form-check-label" for="gridCheck">
                                    Aceito a politica de notificação quanto a segurança do paciente
                                </label>
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <button class="btn btn-success">Notificar</button>
                        </div>
                    </form>


                    <!--<br>-->
                    <!--<div class="col-lg-6">-->
                    <!--<div class="input-group">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<label class="input-group-text" for="inputGroupIncidente">Tipo de incidente:</label>-->
                    <!--</div>-->
                    <!--<select class="form-control" id="inputGroupIncidente" v-model="notificacao.incidente">-->
                    <!--<option selected>Selecione...</option>-->
                    <!--<option v-for="u in incidentes" :value="u.nome">{{ u.nome }}</option>-->
                    <!--</select>-->
                    <!--</div>-->

                    <!--<div class="input-group">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<label class="input-group-text" for="inputGroupUnidadeNot1">Setor notificante:</label>-->
                    <!--</div>-->
                    <!--<select class="form-control" id="inputGroupUnidadeNot1" v-model="notificacao.notificante">-->
                    <!--<option selected>Selecione...</option>-->
                    <!--<option v-for="u in unidades" :value="u.nome">{{ u.nome }}</option>-->
                    <!--</select>-->
                    <!--</div>-->
                    <!--<div class="input-group">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<label class="input-group-text" for="inputGroupUnidadeNot2">Setor notificado:</label>-->
                    <!--</div>-->
                    <!--<select class="form-control" id="inputGroupUnidadeNot2" v-model="notificacao.notificado">-->
                    <!--<option selected>Selecione...</option>-->
                    <!--<option v-for="u in unidades" :value="u.nome">{{ u.nome }}</option>-->
                    <!--</select>-->
                    <!--</div>-->

                    <!--<div class="input-group">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<label class="input-group-text" for="inputGroupUnidadeNot2">Turno:</label>-->
                    <!--</div>-->
                    <!--<input type="text" v-model="notificacao.turno" class="form-control" id="inputGroupUnidadeNot2">-->
                    <!--</div>-->

                    <!--<div class="input-group">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<label class="input-group-text" for="inputGroupAtendimento">Código do atendimento:</label>-->
                    <!--</div>-->
                    <!--<input type="text" v-model="notificacao.atendimento" class="form-control" id="inputGroupAtendimento">-->
                    <!--</div>-->

                    <!--&lt;!&ndash;<input type="text" class="form-control" v-model="codigoPesquisa">&ndash;&gt;-->
                    <!--&lt;!&ndash;<hr>&ndash;&gt;-->
                    <!--&lt;!&ndash;<pre>{{ atendimentoFiltrado }}</pre>&ndash;&gt;-->

                    <!--<br>-->
                    <!--<button class="btn btn-success" @click="doNotificar">Notificar</button>-->
                    <!--<button class="btn btn-default" @click="cards = !cards">Exibir cartões</button>-->
                    <!--<button class="btn btn-danger" @click="notificar = 0">Cancelar</button>-->

                    <!--</div>-->
                    <!--<div class="col-lg-6" v-show="cards">-->
                    <!--<ul class="list-group">-->
                    <!--<li class="list-group-item" v-for="item in eventos" v-bind:key="item['.key']">-->
                    <!--<button class="btn btn-xs btn-danger pull-right" @click="removerItem(item['.key'])" title="Remover"><i class="fa fa-times"></i></button>-->
                    <!--<i class="fa fa-exclamation-triangle text-danger"></i>-->
                    <!--<strong>{{ item.notificacao.tipo }}</strong> - {{ item.identificacao.setor_notificado }} - {{ item.identificacao.data }}<br>-->
                    <!--<small>-->
                    <!--{{ item.notificacao.descricao }}<br>-->
                    <!--<strong>Paciente: </strong> - {{ item.paciente.nome }}<br>-->
                    <!--<strong>Data nascimento: </strong> - {{ item.paciente.data_nascimento }}<br>-->
                    <!--<strong>Nome mãe: </strong> - {{ item.paciente.nome_mae }}<br>-->
                    <!--</small><br>-->

                    <!--<small><strong>Notificante: </strong> {{ item.user}}</small><br><br>-->
                    <!--<button class="btn btn-xs btn-primary">Evoluir análise</button>-->
                    <!--</li>-->
                    <!--</ul>-->

                    <!--</div>-->
                </div>
            </tab>
            <tab-group header="Notificados">
                <tab header="Lista global de notificações">
                    <h3>Listagem das notificações registradas</h3>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <!--<caption>Listagem das notificações registradas</caption>-->
                                    <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Tipo</th>
                                        <th>Setor</th>
                                        <th>Atendimento</th>
                                        <th>Paciente</th>
                                        <th>Usuário</th>
                                        <th>Ações</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in eventos" v-bind:key="item['.key']">
                                        <td>{{ item.identificacao.data }}</td>
                                        <td><i class="fa fa-exclamation-triangle text-danger"></i> {{ item.notificacao.tipo }}</td>
                                        <td>{{ item.identificacao.setor_notificado }}</td>
                                        <td>{{ item.paciente.atendimento }}</td>
                                        <td>{{ item.paciente.nome }}</td>
                                        <td>{{ item.user }}</td>
                                        <td><button class="btn btn-xs btn-danger" @click="removerItem(item['.key'])" title="Remover"><i class="fa fa-times"></i></button></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </tab>
                <tab header="Notificações por setor">
                    <h3>Setores</h3>
                    <div class="row">
                        <div class="col-sm-3" v-for="(item, key, index) in grupoSetores">
                            <button class="btn btn-default btn-block">
                                <i class="fa fa-3x fa-h-square"></i><br>
                                <strong>{{ key }}</strong><br>
                                Notificações: {{ item.length }}<br>
                            </button>
                        </div>
                    </div>
                </tab>
            </tab-group>
            <tab-group header="Cadastros">
                <tab header="Cadastro de unidades">
                    <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <nisp-cadastro-unidades></nisp-cadastro-unidades>
                    </div>
                </tab>
                <tab header="Cadastro de incidentes">
                    <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <nisp-cadastro-incidentes></nisp-cadastro-incidentes>
                    </div>
                </tab>
                <tab header="Cadastro de formas de detecção">
                    <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <nisp-cadastro-deteccao></nisp-cadastro-deteccao>
                    </div>
                </tab>
                <tab header="Cadastro de graus de dano">
                    <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <nisp-cadastro-grau-dano></nisp-cadastro-grau-dano>
                    </div>
                </tab>
                <tab header="Cadastro de caracterização clínica">
                    <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <nisp-cadastro-caracterizacao></nisp-cadastro-caracterizacao>
                    </div>
                </tab>
            </tab-group>
        </tabs>

        <alert v-model="showNotificicarDone" placement="top-right" duration="3000" type="success" width="400px" dismissable>
            <span class="icon-ok-circled alert-icon-float-left"></span>
            <strong>Notificação registrada!</strong>
            <p>Sua notificação foi salva com sucesso.</p>
        </alert>

    </section>
</template>

<script>
    import { db, eventosDB, unidadesDB, nispIncidentesDB, nispDeteccaoDB, nispGrauDanoDB, atendimentosDB } from './../firebase'
    import moment from 'moment'
    import { alert, tabs, tabGroup, tab, spinner } from 'vue-strap'
    export default {
        name: "notificacoes",
        components: {
            alert,
            tabs,
            tabGroup,
            tab
        },
        data() {
            return {
                activeTab: 0,
                notificar: 0,
                showNotificicarDone: false,
                spinner: true,
                notificacao: {
                    incidente: "",
                    notificante: "",
                    notificado: "",
                    turno: "",
                    atendimento: {
                        nome: '',
                        data_nascimento: '',
                        nome_mae: '',
                        unidade: '',
                        leito: ''
                    }
                },
                cards: false,
                codigoPesquisa: 332200
            }
        },
        firebase: {
            unidades: unidadesDB
                .orderByChild("nome")
                .limitToLast(100),
            incidentes: nispIncidentesDB
                .orderByChild("nome")
                .limitToLast(100),
            deteccao: nispDeteccaoDB
                .orderByChild("nome")
                .limitToLast(100),
            grauDano: nispGrauDanoDB
                .orderByChild("nome")
                .limitToLast(100),
            atendimentos: atendimentosDB
                .orderByChild("data_atendimento"),
            eventos: eventosDB
                .orderByChild("nome")
                .limitToLast(200)
        },

        methods: {
            doNotificar() {
                console.log('doNotificar()')
                var eventoAdverso = {
                    identificacao: {
                      setor_notificante: this.notificacao.notificante,
                      setor_notificado: this.notificacao.notificado,
                      turno: "Diurno",
                      data: moment().format('YYYY-MM-DD hh:mm:ss'),
                    },
                    paciente: {
                      atendimento: 123456,
                      nome: "João das Flores",
                      data_nascimento: "01/01/1950",
                      nome_mae: "Maria das Flores"
                    },
                    notificacao: {
                      tipo: this.notificacao.incidente,
                      descricao: "Evento ocorrido assim assim assado."
                    },
                    evento: "Evento Adverso",
                    user: "hersonpc@gmail.com",

                    pendente: true,
                    edit: false
                }

                eventosDB.push(eventoAdverso);

                this.cleanNotificar();

                // let tmp_names = this.$firebase.database().ref('collections/names').orderByChild("name");
                // console.log( tmp_names );
                // // console.log( namesRef.orderByChild("name") );
            },

            removerItem(key) {
                eventosDB.child(key).remove();
            },

            iniNotificar(idx, tipo) {
                console.log(tipo.nome)
                this.notificar = idx
                this.notificacao.incidente = tipo
            },

            cleanNotificar() {
                this.notificar = 0
                this.notificacao.incidente = ""
                this.notificacao.notificante = ""
                this.notificacao.notificado = ""
                this.notificacao.turno = ""
            },

            onSubmit(evt) {
                evt.preventDefault();

                console.log('Tentou um submit!!!')
                // console.log(typeof(self.notificacao.atendimento))

                this.localizar(this.codigoPesquisa)

                // this.doNotificar()

                return false
            },

            setup(codigo_atendimento) {
                console.log('setup = ', codigo_atendimento)
                this.localizar(codigo_atendimento)
                this.notificar = 1
                this.activeTab = 1

                this.showNotificicarDone = true
            },

            localizar(codigo_atendimento) {
                var self = this

                this.notificacao.atendimento = {}

                console.log('consultar codigo = ', codigo_atendimento)
                var resultado = this.atendimentos.filter(snapshot => {
                    return snapshot.atendimento.includes(codigo_atendimento)
                })

                console.log('encontrados = #', resultado.length)
                if(resultado.length == 1) {
                    console.log(resultado[0])
                    this.notificacao.atendimento = resultado[0]
                }

            }
        },
        computed: {
            grupoSetores() {
                return _.groupBy(this.eventos, function(b) { return b.identificacao.setor_notificado });
            },

            atendimentosOrdered() {
                return _.orderBy(this.atendimentos, ['atendimento'], ['desc'])
            },

            atendimentoFiltrado() {
                var self = this
                var resultado = this.atendimentos.filter(obj => {
                    return obj.atendimento.includes(self.codigoPesquisa)
                })

                return resultado
            }
        }
    }
</script>

<style scoped>
    .col-sm-3, .col-md-3 {
        margin-bottom: 15px;
    }
    .table-striped > thead > tr > th {
        font-size: 90%;
    }
    .table-striped > tbody > tr > td {
        font-size: 90%;
    }
</style>