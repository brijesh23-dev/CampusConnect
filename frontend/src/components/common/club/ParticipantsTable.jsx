import React, { useEffect } from 'react'
import { fetchParticipants } from '@/redux/eventSlice'
import { useSelector,useDispatch } from 'react-redux'
const ParticipantsTable = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const res = dispatch(fetchParticipants())
        console.log(res)
    },[])
  return (
    <div>ParticipantsTable</div>
  )
}

export default ParticipantsTable;