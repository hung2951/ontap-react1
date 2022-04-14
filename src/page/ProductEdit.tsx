import axios from 'axios'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductType } from './ProductType'
type Props = {
    onEdit: (product: ProductType) => void
}
type Inputs = {
    name: string,
    price: number,
    img: string,
    desc: string
}
const ProductEdit = (props: Props) => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get('http://localhost:8000/products/' + id)
            reset(data)
        }
        getProduct()

    })

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = data => {
        props.onEdit(data)
        navigate('/products')
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tên sản phẩm</label>
                    <input type="text" {...register('name', { minLength: 5 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    {errors.name && <div id="emailHelp" className="form-text">Ít nhất 5 kí tự!</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Giá</label>
                    <input type="number" {...register('price', { valueAsNumber: true })} className="form-control" id="exampleInputPassword1" />
                    {errors.price && <div id="emailHelp" className="form-text">Vui lòng nhập số!</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Ảnh</label>
                    <input type="text" {...register('img', { required: true })} className="form-control" id="exampleInputPassword1" />
                    {errors.img && <div id="emailHelp" className="form-text">Không được để trống!</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mô tả</label>
                    <textarea {...register('desc', { required: true })} className="form-control" id="exampleInputPassword1" />
                    {errors.desc && <div id="emailHelp" className="form-text">Không được để trống!</div>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ProductEdit