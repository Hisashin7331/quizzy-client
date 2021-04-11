/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'

import Heading from 'components/atoms/Heading'
import Tile from 'components/atoms/Tile'

import { getRecentQuizzes } from 'api/quizzes'

import { Content, Tiles, LoadMoreButton } from './styles'

const Recent = () => {
    const [quizzes, setQuizzes] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [skip, setSkip] = useState(0)
    const limit = 16

    useEffect(() => {
        getRecentQuizzes(skip, limit).then(data => {
            if (data.length > 0) {
                setIsFetching(false)
                setQuizzes(data)
                setSkip(skip + limit)
            }
        })
    }, [])

    const loadMore = () => {
        setIsFetching(true)
        getRecentQuizzes(skip, limit).then(data => {
            setIsFetching(false)
            if (data.length > 0) {
                setQuizzes([...quizzes, ...data])
            }
        })
    }
    return (
        <Content>
            <Heading header='Recent' />
            <Tiles>
                {quizzes.map(item => (
                    <Tile
                        key={item._id}
                        name={item.name}
                        author={item.author}
                        views={item.views}
                    />
                ))}
            </Tiles>

            <LoadMoreButton onClick={loadMore} type='button'>
                {!isFetching ? (
                    <h1>LOAD MORE</h1>
                ) : (
                    <h1>LOADING...</h1>
                )}
            </LoadMoreButton>
        </Content>
    )
}

export default Recent