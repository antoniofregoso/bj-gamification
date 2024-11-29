import { AppElement } from "@buyerjourney/bj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus, faTruck} from '@fortawesome/free-solid-svg-icons';
import { toast } from "bulma-toast";

export class SocialProof extends AppElement {

    #default = {
        position:"top-right",
        items:5,
        color:"has-text-dark",
        dismissible:false,
        duration:6000,
        animateIn:"backInUp",
        animateOut:"backOutRight" ,
        visitors:{
            text:{
                es:"visitantes están comprando en línea.",
                en:"visitors are buying online.",
                fr:"visiteurs font des achats en ligne."
                }
        },
        sale:{
            text:{
                es:"de",
                en:"from",
                fr:"de"
                },
            text2:{
                es:"acaba de comprar",
                en:"just bought",
                fr:"je viens d'acheter"
                }
            
        },
        m:{
            es:"hace un minuto.",
            en:"a minute ago.",
            fr:"il y'a une minute."
        },
        ms:{
            es:"hace {} minutos.",
            en:"{} minutes ago.",
            fr:"cela fait {} minutes."},
        h:{
            es:"hace una hora.",
            en:"an hour ago.",
            fr:"il y a une heure."},
        hs:{
            es:"hace {} horas.",
            en:"{} hours ago.",
            fr:"il y a {} heures."},
        d:{
            es:"hace un día.",
            en:"a day ago.",
            fr:"il y a un jour."},
        ds:{
            es:"hace {} días.",
            en:"{} days ago.",
            fr:"il y a {} jours."},
        items : [],
        context:{
            lang:"en"
        }
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
    }
    #getProof(src){
        const payload = {
            items : 5
          }
        fetch(src, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when making the request');
                  }
                  return response.json();
            })
            .then(data => {
                this.state.items = [];
                data.result.forEach(proof => {         
                    let indicator = '';
                    let content = '';
                    let border = '';
                    let color = '';
                    let background = ''
                    let when = this.#getDT(proof.delta);
                    switch (proof.type ){
                        case 'visitors':
                            indicator = icon(faCartPlus, {classes: ['is-size-2', 'mt-3']}).html[0];
                            content = `<div class="column is-one-fifth has-text-centered">${indicator}</div>
                                        <div class="column has-text-left is-size-5">
                                        <p style="position: absolute; top: 12px; left: 85px; font-size: smaller;"><b>${proof.count}</b> ${this.state.visitors.text[this.state.context.lang]}</p>
                                        </div>`;
                            border = this.state.visitors.border;
                            break;
                        case 'sale':
                            content =`<div class="column is-one-fifth"><figure class="image is-64x64"><img src="${proof.image}" /></figure></div>
                                    <div class="column has-text-left">
                                    <p style="position: absolute; top: 10px; left: 75px; font-size: smaller;"><b>${proof.name}</b> ${this.state.sale.text[this.state.context.lang]} ${proof.state}, ${proof.country} ${this.state.sale.text2[this.state.context.lang]} <b>${proof.count} ${proof.product}</b> ${when}</p>
                                    </div>`;
                            border = this.state.sale.border;
                            break;
                    }
                    let message = /*html*/`<div class="columns is-gapless has-background-light ${this.state.color}" style="width:350px; height: 64px;">${content}</div>`;
                    this.state.items.push({message:message, border:border});              
                });
              })
              .catch(error => {
                console.error('There was a problem with the request', error);
              });
    }



    loadProofs(){
        let src = this.getAttribute("src");
        if (src!=null){
            this.#getProof(src)
        }else console.error(`The src attribute has not been set on the social-proof element with id "${this.id}"`)
        
    }

    showToast(){
        if (this.state.items.length>0){
            let socialProof = this.state.items.shift();
            toast({
                duration:this.state.duration,
                extraClasses:["p-1"],
                type:socialProof.border,
                position:this.state.position,
                dismissible:this.state.dismissible,
                message: socialProof.message,
                animate: { in: this.state.animateIn, out: this.state.animateOut },
                });
        }
    }

    #getDT(delta){
        let message = '';
        if (delta < 60){
            if (delta == 1){
                message = this.state.m[this.state.context.lang]
            }else{
                message = this.state.ms[this.state.context.lang].replace("{}", delta);
            }
        }else if (delta < 1440){
            if (delta == 60){
                message = this.state.h[this.state.context.lang]
            }else{
                message = this.state.hs[this.state.context.lang].replace("{}", parseInt(delta/60));
            }
        }else{
            if (delta == 1440){
                message = this.state.d[this.state.context.lang]
            }else{
                message = this.state.ds[this.state.context.lang].replace("{}", parseInt(delta/1440));
            }
        }
        return message;
    }

     

    render(){
        this.loadProofs();
    }
   

}

customElements.define("social-proof", SocialProof)