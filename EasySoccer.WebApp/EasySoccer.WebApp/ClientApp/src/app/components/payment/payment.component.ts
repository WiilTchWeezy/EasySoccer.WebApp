import { Component, OnInit } from '@angular/core';
import { CompanyUserService } from '../../service/company-user.service';
import { FinancialService } from '../../service/financial.service';
import { ToastserviceService } from '../../service/toastservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private financialService: FinancialService, private toastService: ToastserviceService, private companyUserService: CompanyUserService) { }
  plans: any[];
  installments: any[];
  public plan: any;
  public installment: any;
  public financialName: string;
  public financialDocument: string;
  public financialBirthDay: string;
  public cardNumber: string;
  public securityCode: string;
  public cardExpiration: string;
  ngOnInit() {
    this.GetPlansInfo();
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
      SelectedInstallments: this.installment.id
    };
    this.companyUserService.payment(request).subscribe((res)=>
    {
      this.plans = res;
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
