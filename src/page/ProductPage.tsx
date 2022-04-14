import React from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from './ProductType'

type Props = {
    products: ProductType[],
    onRemove: (id: number) => void
}

const ProductPage = (props: Props) => {
    return (
        <div>
            <Link to='/products/add'>Thêm sản phẩm</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">sản phẩm</th>
                        <th scope="col">giá</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((item, index) => {
                        return (
                            <tr key={index + 1}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name} <span><img src={item.img} width={120} /></span></td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/products/edit/${item.id}`}>Edit</Link>
                                    <button onClick={() => props.onRemove(item.id!)}>Xóa</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div >
    )
}

export default ProductPage