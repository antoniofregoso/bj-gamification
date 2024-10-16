import { AppElement } from "@buyerjourney/bj-core";

export class DiscountCoupon extends AppElement {

    #default = {

        context:{
          lang:"en"
      }
        };



    constructor(props={}){
        super();
        this.eventName = "user:click-coupon";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.classList.add('modal', 'is-active');
        if (this.state.active==='open'){
            this.classList.add('is-active');
        }
    }

    static get observedAttributes() {
        return ["active"];
        }

    attributeChangedCallback(name, old, now) {
        if (name==='active'&&now===''){
            this.querySelector('.modal').classList.add('is-active')
        }
          }

    handleEvent(event) {
        if (event.type === "click") {
            if (event.target.ariaLabel==='close'){
                this.querySelector(".modal").classList.remove("is-active");
                this.removeAttribute('active');
            }
            
        }
    }

    render(){
        console.log('Prueba', this.state)
        this.innerHTML =  /* html */`
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title"></p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </div>
                <p class="help is-success">This username is available</p>
                </div>
                <div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                    <button class="button is-success">Save changes</button>
                    <button class="button">Cancel</button>
                    </div>
                </footer>
            </div>   
            `
        let btnClose = this.querySelector(".delete");
        btnClose.addEventListener("click",this);
        let btnCoupon = this.querySelector(".btn-coupon");
        btnCoupon.addEventListener("click",this);

    }
}


customElements.define("discount-coupon", DiscountCoupon);