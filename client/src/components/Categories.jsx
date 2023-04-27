import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Categories() {

    const [categories, setCategories] = useState([])
    const client = axios.create({
        baseURL: 'http://localhost:3000',
        headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
    })

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await client.get('/categories')
                setCategories(response.data.body.categories)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])


    return (
        <div className='flex flex-col h-[440px]  '>
            {categories.map((category) => (
                <Link className='flex ' to={`/categories/${category.id.toString()}`} >
                    <ul key={category.id} >
                        <li className='py-5 font-serif text-gray-600 capitalize hover:text-red-600' >{category.name} <span className='text-red-500'>({category.posts.length})</span> </li>
                    </ul>
                </Link>

            ))}

        </div>
    )
}

