import SlateAutoComplete from '..'
import React from 'react'
import ReactDOM from 'react-dom'
import initialState from './state.json'
import { fromJS } from 'immutable';
import { Editor, Raw } from 'slate'

const schema = {
  nodes: {
    paragraph: props => <p>{props.children}</p>,
    mention: props => <div className="mention">{props.children}</div>
  }
}

const mentions = fromJS([
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
])

class Example extends React.Component {

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  onChange = (state) => {
    this.setState({ state })
  }

  filter = (choice, matchText) =>
    choice
      .name
      .toLowerCase()
      .includes(matchText.toLowerCase())

  render = () => {
    return (
      <div>
        <Editor
          schema={schema}
          onChange={this.onChange}
          plugins={this.plugins}
          state={this.state.state}
        />
        <SlateAutoComplete
          state={this.state.state}
          onChange={this.onChange}
          choices={mentions.toJS()}
          trigger="@"
          predicate={this.filter}
          nodeName="mention"
          choiceComponent={(props) => <li>{props.choice.name}</li>}
        />
      </div>
    )
  }

}

const example = <Example />
const root = document.body.querySelector('main')
ReactDOM.render(example, root)
