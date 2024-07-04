import './App.css'
import { TwitterFollowCrad } from './TwitterFollowCard'

const users = [
    {
      userName: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: true
    },
    {
      userName: 'PacoHdezs',
      name: 'Paco Hdez',
      isFollowing: true
    },
    {
      userName: 'TMChein',
      name: 'Tomas',
      isFollowing: false
    }
  ]

  export function App () {
    const formatUserName = (userName) => `@${userName}`
    return(
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCrad formatUserName={formatUserName} initialIsFollowing={isFollowing} key={userName} userName={userName} >{name}</TwitterFollowCrad>
                  ))
            }
        </section>
    )

}