import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup, FormArray , FormControl} from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  
  updateMyForm: FormGroup;
  submitted = false;


  euRes: any = ['YES' , 'NO'];
  Data: Array<any> = [
    { id: 1, name: 'ADVANCES' , value: 'advances'},
    { id: 2, name: 'ALERTS' , value: 'alerts'},
    { id: 3, name: 'OTHER COMMUNICATIONS' , value: 'other comunications'}
  ];

  dataSelected! : string[];
  

  constructor(private form: FormBuilder) { 
    this.updateMyForm = this.form.group({
      firtsName:[
        '', Validators.required
      ],
      lastName:[
        '', Validators.required
      ],
      email: [
        '',
        [
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          ),
          Validators.required
        ],
      ],
      organization:[''],
      euResident:['' , Validators.required],
      checkBoxOpt: this.form.array([] , [Validators.required]) 
    });
  }

  ngOnInit(): void {
    this.dataSelected = new Array<string>();
  }

  get myForm(){
    return this.updateMyForm.controls;
  }

  
  changeOption(e){
    this.myForm.euResident.setValue(e.target.value,{
      onlySelf: true
    })
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.updateMyForm.get('checkBoxOpt') as FormArray;
    
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else{
      let i : number = 0;
      checkArray.controls.filter((x) => {
      if (x.value == e.target.value) {
        checkArray.removeAt(i);
        return;
        }
        i++;
      })
    }
  }

  onSubmit(){
    const myDataForm = document.querySelector("#dataContainer");
    const succesMsj = document.createElement('article');
    succesMsj.className += "message";
    const errorCase = document.createElement('article');
    
    const submitMsj = [
      {status : "Success" , message: "Thank you. You are now subcribed"},
      {status : "Error" , message: "Invalid subscription request"},
    ];

    this.submitted = true;
    if (this.updateMyForm.invalid) {
      return;
    }else{
      succesMsj.innerHTML += `
          <h2>${submitMsj[0].status}</h2>
          <p>${submitMsj[0].message}</p>`; 
      myDataForm?.parentNode?.replaceChild(succesMsj, myDataForm);
    }

    

    /*errorCase.innerHTML += `
          <h2>${submitMsj[1].status}</h2>
          <p>${submitMsj[2].message}</p>`;
      myDataForm?.parentNode?.replaceChild(errorCase, myDataForm);*/

    
  }



  onReset() {
    this.submitted = false;
    this.updateMyForm.reset();
  }

}
