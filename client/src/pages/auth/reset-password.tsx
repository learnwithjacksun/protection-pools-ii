import { AuthLayout } from '@/layouts'
import { ButtonWithLoader, InputWithoutIcon } from '@/components/ui'
import { Link } from 'react-router-dom'

export default function ResetPassword() {
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password and confirm it">
        <form className="space-y-6">
            <InputWithoutIcon
                type="password"
                label="Password"
                placeholder="Enter Password"
                className="bg-gray-100"
            />
            <InputWithoutIcon
                type="password"
                label="Confirm Password"
                placeholder="Enter Confirm Password"
                className="bg-gray-100"
            />
            <ButtonWithLoader
                initialText="Reset Password"
                loadingText="Loading..."
                type="submit"
                className="w-full btn-primary h-11 rounded-lg"
            />
            <div className="text-center">
                <p className="text-sm text-main">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-primary font-semibold underline">
                        Login
                    </Link>
                </p>
            </div>
        </form>
    </AuthLayout>
  )
}