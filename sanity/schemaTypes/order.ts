import { title } from "process";

export default {
    name:"order",
    type:"document",
    title:"Order",
    fields:[
        {
            name:"firstName",
            title:"First Name",
            type:"string",
        },
        {
            name:"lastName",
            title:"Last Name",
            type:"string",
        },
        {
            name:"adress",
            title:"Adress",
            type:"string",
        },
        {
            name:"province",
            title:"Province",
            type:"string",
        },
        {
            name:"phone",
            title:"Phone",
            type:"number",
        },
        {
            name:"email",
            title:"Email",
            type:"string",
        },
        {
            name:"zipCode",
            title:"Zip Code",
            type:"number",
        },
         {
        name:'city',
        type:'string',
        title:'City',
        options:{
            list:[
                {title:'Karachi',value:'karachi'},
                {title:'lahore',value:'lahore'},
                {title:'Islamabad',value:'islamabad'},
            ],
            layout:'dropdown',//if you want to add dropdown so you can
        }
          },
          {
            name:"cartItems",
            title:"Cart Items",
            type:"array",
            of:[
                {
                    type:'reference',
                    to:{type:'product'}
                }
            ]
          },
          {
            name:"total",
            title:"Total",
            type:"number",
        },
        {
            name:"status",
            title:"Status",
            type:"string",
            options:{
                list:[
                    {
                        title:'Pending',
                        value:"pending"
                    },
                    {
                        title:"Success",
                        value:"sucess"
                    },
                    {
                        title:"Dispatch",
                        vale:"dispatch"
                    },
                ],
                layout:'radio'//optional change to dropdown if you prefer a dropdown
            },
            initialValue:"pending"//Default value
        }
    ]
}