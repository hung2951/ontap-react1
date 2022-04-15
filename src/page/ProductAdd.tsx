import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ProductType } from './ProductType'

type Props = {
    onAdd: (products: ProductType) => void
}
type Inputs = {
    name: string,
    price: number,
    img: string,
    desc: string
}
const ProductAdd = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = data => {
        props.onAdd(data)
        navigate('/products')
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tên sản phẩm</label>
                    <input type="text" {...register('name', { required: true, minLength: 5 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.name && <div id="emailHelp" className="form-text">Ít nhất 5 kí tự!</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Giá</label>
                    <input type="number" {...register('price', { required: true, valueAsNumber: true })} className="form-control" id="exampleInputPassword1" />
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

export default ProductAdd