import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name:"description",
            type:"text",
            validation: (rule) => rule.required(),
            title:"Description",
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }]
        },
        {
            name:"discountPercentage",
            type:"number",
            title:"Discount Percentage",
        },
        {
            name:"isNew",
            type:"boolean",
            title:"New Badge",
        },
        {
            name:'slug',
            type:'slug',
            title:'Slug',
            options:{
                source:'title',
                maxLength:96
            },
            validation:Rule => Rule.required()
        },
    ]
})

// export default {
//     name: 'product',
//     title: 'Product',
//     type: 'document',
//     fields: [
//       { name: 'title', title: 'Title', type: 'string' },
//       { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
//     ],
//     validation: (Rule: { unique: () => { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; }) => Rule.unique().error('This product already exists.'),
//   };
  