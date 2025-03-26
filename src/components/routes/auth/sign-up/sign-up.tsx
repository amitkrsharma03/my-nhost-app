import OAuthLinks from '@/components/auth/oauth-links'
import SignUpFooter from '@/components/auth/sign-up-footer'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="flex flex-row items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-md shadow">
        <img src={process.env.PUBLIC_URL + 'favicon.svg'}></img>
        <h1 className="mb-8 text-3xl">Sign Up</h1>
        <OAuthLinks />

        <Separator className="my-4" />

        <div className="space-y-2">
          
          <Link
            to={'/sign-up/email-password'}
            className={cn(buttonVariants({ variant: 'ghost' }), 'w-full text-center')}
          >
            <span className="flex-1">Continue with email + password</span>
          </Link>
        </div>

        <Separator className="my-2" />

        <SignUpFooter />
      </div>
    </div>
  )
}
