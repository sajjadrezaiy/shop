require('bundle.js')

console.log("enter to render.js")
const db=require('./db')

$=require('jquery')
console.log('enter to render.js')
require('popper.js')
require('bootstrap')
const {remote}=require('electron')



db.schema.createTableIfNotExists('accounting',table=>{
    table.increments('id');
    table.string('Fname');
    table.string('title');
    table.bigInteger('price');
    table.bigInteger('givenprice');
    table.string('status');
})
$(document).ready(function(){
    console.log('enter to ready')
    $('#paymentAndReceiveModal').on('show.bs.modal',function(event){
        let modal=$(this)
        modal.find('#add-row').on('click',function(e){
            console.log('enter add row')
            let Fname=modal.find('.modal-body input[name=Fname]').val();
            let title=modal.filter('.modal-body input[name=title]').val();
            let price=modal.find('.modal-body input[name=price]').val()
            let givenprice=modal.find(".modal-body input[name=givenprice").val()
            let status=modal.find('.modal-body input[name=status]').val()
            let moaref=modal.find('.modal-body input[name=moaref]').val()

            if(Fname !=' ' && title!=' ' && price!= ' ' ){
                addRow(Fname,title,price,givenprice,status,moaref)
                modal.find('form input').val(' ');
                modal.modal('hide');
            }

        })
    })
})

const addRow=(data)=>{
    db('accouning').insert(data).then(()=>{
        showData();
    })

    }



const showData=()=>{
    db('accounting').select('*').orderBy('id','desc').then((rows)=>{
        renderData(rows)
    })
}

const renderData=(data)=>{
    let sectionData=$('#show-data');
    sectionData.empty()
    data.forEach(item => {
        sectionData.append(
          `
          <tr>
          <th>${item.id}</th>
          <td>${item.Fname}</td>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.givenprice}</td>
          <td>${item.status}</td>
          <td>${item.moaref}</td>
          <td>
          <div class="btn-group">
          <button type="button" class="btn btn-info">edit</button>
          <button type="button" class="btn btn-danger">delete</button>                        
           </div>
            </td>

        </tr>

          
          
          `  
        )

        
    });
}
