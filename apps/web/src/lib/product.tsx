'use client'
export const product = {
    id: ~~(Math.random() * 100) + 1,
    image: "/img.png",
    name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
    price: 350000,
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium, aspernatur provident beatae corporis veniam atque facilis, consequuntur assumenda, vitae dignissimos iste exercitationem dolor eveniet alias eos ullam nesciunt voluptatum",
    colors: [
        { id: '1', value: "putih", label: "Putih", price: 100000 },
        { id: '2', value: "biru", label: "Biru", price: 400000 },
        { id: '3', value: "coklat", label: "Coklat", price: 500000 },
        { id: '4', value: "kuning", label: "Kuning", price: 600000 }
    ]
}