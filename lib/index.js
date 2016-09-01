/**
 * A Slate plugin to add soft breaks on return.
 *
 * @param {Object} options
 *   @property {Array} onlyIn (optional)
 *   @property {Array} ignoreIn (optional)
 * @return {Object}
 */

import React from 'react'
import escapeRegExp from 'lodash/escapeRegExp'

const patternFromTrigger = (trigger) => new RegExp(`(\\s|^)${escapeRegExp(trigger)}[\\w]*`, 'g')

const findWithRegex = (regex, text) => {
  let matchArr
  let start
  let matches = []
  while ((matchArr = regex.exec(text)) !== null) {
    matches.push([matchArr.index, matchArr.index + matchArr[0].length])
  }
  return matches
}

const filter = (state, choices, trigger, predicate) => {
  const pattern = patternFromTrigger(trigger)
  const text = state.anchorBlock.text
  const matches = findWithRegex(pattern, text).map(match => [match[0] + 2, match[1]])
  const anchorOffset = state.selection.anchorOffset

  if (matches.length) {
    const selectedMatch = matches.find(match =>
      anchorOffset >= match[0] && anchorOffset <= match[1]
    )
    if (selectedMatch) {
      const selectedMatchText = text.substring(selectedMatch[0], selectedMatch[1])
      return choices.filter(choice => predicate(choice, selectedMatchText))
    }
  }
  return []
}

export default (props) => {
  if (props.state.selection.isExpanded) {
    return null
  }
  const ChoiceComponent = props.choiceComponent;
  const filteredChoices = filter(
    props.state,
    props.choices,
    props.trigger,
    props.predicate
  )
    .map(choice => <ChoiceComponent choice={choice} />)
  if (filteredChoices.length) {
    return <ul>{filteredChoices}</ul>
  }
  return null
}
