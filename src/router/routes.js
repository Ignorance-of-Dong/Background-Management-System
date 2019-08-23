import PgWelcome from '../views/PgWelcome/index'
import PgHomeWelcome from '../views/PgHome/index'
import PgAddActive from '../views/PgAddActive/index'
import PgLogin from '../views/PgLogin/index'
import pgHotActive from '../views/PgHotActive/index'
import PgBanner from '../views/PgBanner/index'
import PgSetQuestion from '../views/PgSetQuestion'
import PgGoQuestion from '../views/PgToquestion'
import PgQuestionDetail from '../views/PgQuestionDetail'


let router = [
	{
		path: '/login',
		component: PgLogin,
	},
	{
		path: '/goquestion',
		component: PgGoQuestion,
	},
	{
		path: '/',
		component: PgWelcome,
		children: [
			{
				path: '/pgHomeWelcome',
				component: PgHomeWelcome,
			},
			{
				path: '/pgAddActive',
				component: PgAddActive,
			},
			{
				path: '/pgHotActive',
				component: pgHotActive,
			},
			{
				path: '/pgBanner',
				component: PgBanner,
			},
			{
				path: '/setquestion',
				component: PgSetQuestion,
			},
			{
				path: '/questiondetails',
				component: PgQuestionDetail,
			},
		]
	}
]

export default router