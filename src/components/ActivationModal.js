import { AppElement } from "@buyerjourney/bj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCheck, faExclamationTriangle, faEnvelope } from '@fortawesome/free-solid-svg-icons';


export class ActivationModal extends AppElement {

    #default = {
        eventName:"user:click-activation",
        title:{
            text:{
                es:"Obtén tu cupón de descuento",
                en:"Get your discount coupon",
                fr:"Obtenez votre coupon de réduction"
            }
        },
        user:{
            label:{
                text:{
                    es:"Nombre",
                    en:"Name",
                    fr:"Nom"
                }},
            placeholder:{
                text:{
                    es:"Tu nombre aparecerá en tu cupón",
                    en:"Your name will appear on your coupon",
                    fr:"Votre nom apparaîtra sur votre coupon"
                }
            },
            help:{
                es:"El campo Nombre es obligatorio.",
                en:"The Name field is required.",
                fr:"Il est requis de compléter le champ correspondant au nom."
            }
        },
        email:{
            label:{
                text:{
                    es:"Correo Electrónico",
                    en:"Email",
                    fr:"E-mail"
                }},
            placeholder:{
                text:{
                    es:"Te enviaremos por correo su cupón",
                    en:"We will send your coupon to you by mail.",
                    fr:"Nous vous enverrons votre coupon par email"
                }
            },
            help:{
                es:"El campo Correo Electrónico es obligatorio.",
                en:"The Email field is required.",
                fr:"Le champ E-mail est obligatoire."
            },
            help2:{
                es:"El correo electrónico es invalido.",
                en:"Email is invalid.",
                fr:"Le courriel est invalide."
            }
        },
        submit:{
            text:{
                es:"¡Lo Quiero Ya!",
                en:"I Want It Now!",
                fr:"Je le veux maintenant!"
            }
        },
        cancel:{
            text:{
                es:"Cancelar",
                en:"Cancel",
                fr:"Annuler"
            }
        },
        context:{
          lang:"en"
      }
        };

    #user = icon(faUser).html[0];
    #ok = icon(faCheck).html[0];
    #enveloppe = icon(faEnvelope).html[0];
    #alert = icon(faExclamationTriangle).html[0];

    constructor(props={}){
        super();
        this.go = false;
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.classList.add('modal');
        if(this.hasAttribute("active")){
            this.classList.add('is-active');
        }
    }

    static get observedAttributes() {
        return ["active"];
        }

    attributeChangedCallback(name, old, now) {
       console.log(name, old, now)
          }

    handleEvent(event) {
        let mailOk = false;
        let activationForm = this.querySelector("form")
        if (event.type === "click"&&event.target.id==='activation-cancel'){
            const activation = new CustomEvent(this.state.eventName,{
                detail:{click:event.target.id},
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(activation);
        }else if (event.type === "change"&&event.target.id==='activation-email'){
            let regex = /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u00E0-\u00FC.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u00E0-\u00FC\-\.\d]+)((\.([a-zA-Z]){2,63})+)$/;
            if (regex.test(event.target.value)){ 
                this.querySelector("#help-email").classList.add("is-hidden");
                this.querySelector("#help2-email").classList.add("is-hidden");
                this.querySelector("#activation-email").classList.remove("is-danger");
                this.querySelector("#activation-email").classList.add("is-success");
                this.querySelector("#activation-email-icon").innerHTML = this.#ok;
                this.go = true;
                mailOk = true
            }else {
                this.querySelector("#help2-email").classList.remove("is-hidden");
                this.querySelector("#activation-email").classList.remove("is-success");
                this.querySelector("#activation-email").classList.add("is-danger");
                this.querySelector("#activation-email-icon").innerHTML = this.#alert;
                this.go = false;
            }
        }else if (event.type === "submit"){
            event.preventDefault();
            let user = this.querySelector("#activation-user");
            let email = this.querySelector("#activation-email");
            if (user!=null&&user.required&&user.value.trim() === ''){
                this.querySelector("#help-user").classList.remove("is-hidden");
                this.querySelector("#activation-user").classList.remove("is-success");
                this.querySelector("#activation-user").classList.add("is-danger");
                this.querySelector("#activation-user-icon").innerHTML = this.#alert;
                this.go = false;
            }else if (user!=null){
                this.querySelector("#help-user").classList.add("is-hidden");
                this.querySelector("#activation-user").classList.remove("is-danger");
                this.querySelector("#activation-user").classList.add("is-success");
                this.querySelector("#activation-user-icon").innerHTML = this.#ok;
                this.go = true;
            }
            if (email!=null&&email.required&&email.value.trim() === ''){
                this.querySelector("#help-email").classList.remove("is-hidden");
                this.querySelector("#activation-email").classList.remove("is-success");
                this.querySelector("#activation-email").classList.add("is-danger");
                this.querySelector("#activation-email-icon").innerHTML = this.#alert;
                this.go = false;
            }else if (email!=null&&mailOk==true){
                this.querySelector("#help-email").classList.add("is-hidden");
                this.querySelector("#activation-email").classList.remove("is-danger");
                this.querySelector("#activation-email").classList.add("is-success");
                this.querySelector("#activation-email-icon").innerHTML = this.#ok;
                this.go = true;
            }
            if (this.go===true){
                let data = {};
                let dataName = activationForm.querySelector('#activation-user');
                let dataEmail = activationForm.querySelector('#activation-email')
                data.name = dataName .value;
                data.email = dataEmail.value;
                const activation = new CustomEvent(this.state.eventName,{
                    detail:{submit:this.id, activation:data},
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(activation);
            }
        }
    }

    render(){
        this.innerHTML =  /* html */`
            <div class="modal-background"></div>
            <form class="modal-card" ${this.setAnimation(this.state.animation)} novalidate>
                <header class="modal-card-head">
                    <p class="modal-card-title"  ${this.setAnimation(this.state.title.animation)}>
                        ${this.state.title.text[this.state.context.lang]}
                    </p>
                </header>
                <section id="activation" class="modal-card-body">
                    <div class="field">
                    <label class="label">${this.state.user.label.text[this.state.context.lang]}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input id="activation-user" class="input" type="text" placeholder="${this.state.user.placeholder.text[this.state.context.lang]}" required >
                        <span class="icon is-small is-left">
                        ${this.#user}
                        </span>
                        <span id="activation-user-icon" class="icon is-small is-right">
                        </span>
                    </div>
                    <p class="help is-danger is-hidden" id="help-user">${this.state.user?.help[this.state.context.lang]}</p>
                    </div>
                    <div class="field">
                        <label class="label">
                            ${this.state.email.label.text[this.state.context.lang]}
                        </label>
                        <div class="control has-icons-left has-icons-right">
                            <input id="activation-email" class="input" type="email" placeholder="${this.state.email.placeholder.text[this.state.context.lang]}" required >
                            <span class="icon is-small is-left">
                            ${this.#enveloppe}
                            </span>
                            <span id="activation-email-icon" class="icon is-small is-right">
                            </span>
                        </div>
                        <p class="help is-danger is-hidden" id="help-email">${this.state.email?.help[this.state.context.lang]}</p>
                        <p class="help is-danger is-hidden" id="help2-email">${this.state.email?.help2[this.state.context.lang]}</p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div id="submit" class="buttons">
                    <button id="activation-go" class="button is-success">
                    ${this.state.submit.text[this.state.context.lang]}
                    </button>
                    <button id="activation-cancel" class="button">
                    ${this.state.cancel.text[this.state.context.lang]}
                    </button>
                    </div>
                </footer>
            </form>   
            `
        let btnCancel = this.querySelector("#activation-cancel");
        let email = this.querySelector("#activation-email");
        let form = this.querySelector("form");
        btnCancel.addEventListener("click",this);
        form.addEventListener("submit",this);
        email.addEventListener("change",this);
    }
}


customElements.define("activation-modal", ActivationModal);