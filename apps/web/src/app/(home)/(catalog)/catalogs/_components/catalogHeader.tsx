'use client'
import { getCatalog, getCategory, getCategorySlug } from '@/app/action'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const CatalogHeader = () => {
  const params = useSearchParams()
  const [c, setCat] = useState('')
  const [notFound, setNotfound] = useState(false)
  const [g, setGender] = useState('')
  const [t, setType] = useState('')
  const [search, setSearch] = useState('')

  const getCat = async(gen:string, type:string, cat:string) => {
    if (gen && type && cat) {
      const res = await getCategorySlug(gen, type, cat) 
      if (res.status == 'ok') {
        setCat(res.data.category)
        setNotfound(false)
      } else {
        setNotfound(true)
      }
    }
  }

  useEffect(() => {
    const getData = async() => {
      const gender = params.get('g')
      const type = params.get('t')
      const category = params.get('c') 
      const s = 'newest'
      const q = params.get('q')
      const product = await getCatalog(gender || '', type || '', category || '', '', s, '1')
      if (product.status == 'ok') {
        if (gender && type && category) {
          getCat(gender, type, category)
        }
        if (gender) {setGender(gender)} else {setGender('')}
        if (type) {setType(type)} else {setType('')}
        if (!category) {setCat('')}
        if (q) setSearch(q.replaceAll('-', ' '))
        if (!q) setSearch('')
        setNotfound(false)
      } else {
        setNotfound(true)
      }
      }
      getData()
  }, [params])


  return (
    <div>
      <div className={`my-5 lg:my-14 ${search ? 'hidden' : ''}`}>
        <div className={notFound || !t && !c ? 'hidden' : ''}>
          <p className={`text-xl text-center ${t || c || g ? '' : 'hidden'}`}>{g?.toUpperCase()}&apos;S</p>
        </div>
        <p className={`text-2xl sm:text-5xl text-center ${notFound? '' : 'hidden'}`}>Product not found.</p>
        <p className={`text-5xl sm:text-8xl text-center ${notFound? 'hidden' : ''}`}>{c ? c.toUpperCase() : t ? t.toUpperCase() : g!.toUpperCase()}</p>
        <p className={`text-5xl sm:text-8xl text-center ${t || c || g || notFound ? 'hidden' : ''}`}>CATALOGS</p>
      </div>
      <div className={`my-5 lg:my-14 ${search ? '' : 'hidden'}`}>
        <p className={`text-5xl sm:text-xl text-center`}>Showing result(s) for</p>
        <p className={`text-5xl sm:text-8xl text-center`}>{search.toUpperCase()}</p>
      </div>
    </div>
  )
}
