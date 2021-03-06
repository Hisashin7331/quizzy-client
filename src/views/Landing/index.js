import React, { useEffect, useState } from 'react'
import { seo } from 'functions/seo'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Recent from 'views/Landing/pages/Recent'
import Popular from 'views/Landing/pages/Popular'
import Categories from 'views/Landing/pages/Categories'
import Search from 'components/atoms/Search'

import Content from 'components/styles/Content'
import { Column } from 'components/styles/Column'
import FindQuiz from './pages/FindQuiz'

const Landing = ({ match }) => {
    const [searchedValue, setSearchedValue] = useState('')
    const [shouldRerender, setShouldRerender] = useState(false)
    const [category, setCategory] = useState('')
    useEffect(() => {
        seo({
            title: '',
            description:
                'Quizzy is your last quiz-taking website! Create your own quiz and see if it will be trending among users!',
        })
    })
    return (
        <Content>
            <Column full>
                <Search
                    onlyFilter
                    value={searchedValue}
                    setValue={setSearchedValue}
                    setShouldRerender={setShouldRerender}
                    shouldRerender={shouldRerender}
                    setCategory={setCategory}
                />
                <Route exact path={match.path} component={Popular} />
                <Route
                    exact
                    path={`${match.path}/recent`}
                    component={Recent}
                />
                <Route
                    exact
                    path={`${match.path}/search`}
                    render={() => (
                        <FindQuiz shouldRerender={shouldRerender} />
                    )}
                />
                <Route
                    exact
                    path={`${match.path}/categories`}
                    render={() => <Categories category={category} />}
                />
            </Column>
        </Content>
    )
}

export default Landing

Landing.propTypes = {
    match: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.object,
        ]),
    ).isRequired,
}
