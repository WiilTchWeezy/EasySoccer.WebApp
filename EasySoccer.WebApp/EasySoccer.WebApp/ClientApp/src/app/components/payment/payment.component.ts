import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { CompanyUserService } from '../../service/company-user.service';
import { FinancialService } from '../../service/financial.service';
import { ToastserviceService } from '../../service/toastservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private financialService: FinancialService, 
    private toastService: ToastserviceService, 
    private companyUserService: CompanyUserService,
    private companyService: CompanyService,
    private router: Router) { }
  plans: any[];
  installments: any[];
  cities: any[];
  states: any[];
  public plan: any;
  public installment: any;
  public financialName: string;
  public financialDocument: string;
  public financialBirthDay: string;
  public cardNumber: string;
  public securityCode: string;
  public cardExpiration: string;
  public state: any;
  public city: any;
  public neighborhood: string;
  public street: string;
  public streetNumber: string;
  public complementary: string;
  public zipCode: string;
  ngOnInit() {
    this.GetPlansInfo();
    this.LoadStates();
  }
  GetPlansInfo(){
    this.financialService.getPlansInfo().subscribe((res)=>
    {
      this.plans = res;
    }, (error)=>
    {
      this.toastService.showError(
        "Erro ao consultar dados. " + error.Message
      );
    });
  }

  LoadInstallment(){
    this.installments = [];
    if(this.plan){
      for(let i = 1; i<= this.plan.MaxInstallments; i++){
        let installmentValue = this.plan.Value / i;
        this.installments.push({ id: i , value : installmentValue, text : i + ' parcelas ' });
      }
    }
  }

  LoadStates(){
    this.states = [];
    this.companyService.getStates().subscribe((res)=>
    {
      this.states = res;
    }, (error)=>
    {
      this.toastService.showError(
        "Erro ao consultar dados. " + error.Message
      );
    });
  }

  LoadCities(){
    this.cities = [];
    if(this.state){
      this.companyService.getCitiesByState(this.state).subscribe((res)=>
      {
        this.cities = res;
      }, (error)=>
      {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      });
    }
  }

  Pay()
  {
    if(this.plan && this.installment && this.financialName && this.financialDocument && this.financialBirthDay && this.cardNumber && this.securityCode && this.cardExpiration){
    let request = {
      FinancialName: this.financialName,
      FinancialDocument: this.financialDocument,
      FinancialBirthDay: this.financialBirthDay,
      CardNumber: this.cardNumber,
      SecurityCode: this.securityCode,
      CardExpiration: this.cardExpiration,
      SelectedPlan: this.plan.PlanId,
      SelectedInstallments: this.installment,
      StateId: this.state,
      CityId: this.city,
      Neighborhood: this.neighborhood,
      Street: this.street,
      StreetNumber: this.streetNumber,
      ZipCode: this.zipCode,
      Complementary: this.complementary
    };
    this.companyUserService.payment(request).subscribe((res)=>
    {
      this.toastService.showSuccess(
        "Pagamento realizado com sucesso! Muito obrigado."
      );
      this.router.navigate(["/"]);
    }, (error)=>
    {
      this.toastService.showError(
        "Erro ao consultar dados. " + error.Message
      );
    });
  }else{
    this.toastService.showWarnig(
      "Solicitação inválida, verifique os dados preenchidos."
    );
  }
  }
}
