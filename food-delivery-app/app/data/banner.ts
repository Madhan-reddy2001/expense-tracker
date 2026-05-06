import { TiThSmallOutline } from "react-icons/ti"
import { MdOutlineFreeBreakfast } from "react-icons/md"
import { TbSoup } from "react-icons/tb"
import { CiBowlNoodles } from "react-icons/ci"
import { MdOutlineFoodBank } from "react-icons/md"
import { GiFullPizza } from "react-icons/gi"
import { GiHamburger } from "react-icons/gi"
export interface CategoriesTypes{
    id:number,
    name:string,
    icon:React.ElementType,
}

export const categories:CategoriesTypes[]=[
    {
        id:1,
        name:"All",
       icon:TiThSmallOutline
    },
       {
        id:2,
        name:"Breakfast",
       icon:MdOutlineFreeBreakfast
    },
       {
        id:3,
        name:"Soups",
       icon:TbSoup
    },
       {
        id:4,
        name:"Pasta",
       icon:CiBowlNoodles
    },
       {
        id:5,
        name:"Rice",
       icon:MdOutlineFoodBank
    },
       {
        id:6,
        name:"Pizza",
       icon:GiFullPizza
    },
    {
        id:7,
        name:"Burger",
        icon:GiHamburger
    },
]

export default categories;