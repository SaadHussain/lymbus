import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import WordCloud from 'lib/wordcloud';

export default class WordCloudContainer extends Component {
    componentDidMount() {
        const lyrics = this.props.lyrics;
        const container = findDOMNode(this.cloud);

        const styles = window.getComputedStyle(container);
        const width = styles.width.slice(0, -2);
        container.style.height = `${width * 0.65}px`;

        const opts = {
            list: (function () {
                const unordered = Object.keys(lyrics).reduce((list, word) => {
                    list.push([word, lyrics[word]]);
                    return list;
                }, []);

                return unordered.sort((a, b) => b[1] - a[1]);
            })(),
            gridSize: (function () {
                return Math.round(16 * width / 1024)
            })(),
            weightFactor: function (size) {
                return (size + 1.5) * 6
            },
            rotateRatio: 0.5,
            color: function (word, weight, fontSize) {
                let w = weight > 50 ? 50 : weight;
                return `hsla(${(w * 2.5) + 150}, ${0 + (w * 2)}%, 50%, 1)`
            },
            fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
        };

        WordCloud(container, opts);
    }

    render() {
        return <div className='col-sm-8 col-sm-offset-2' style={{zIndex: '-1'}} ref={node => this.cloud = node} />;
    }
}