import { Button } from '@/components/ui/button'
import Logo from './logo'

export default function Footer() {
	return (
		<div className='z-50 flex items-center w-full p-6 bg-background'>
			<Logo />
			<div className='flex items-center justify-between w-full md:ml-auto md:justify-end gap-x-2 text-muted-foreground'>
				<Button variant='ghost' size='sm'>
					Privacy Policy
				</Button>
				<Button variant='ghost' size='sm'>
					Terms & Conditions
				</Button>
			</div>
		</div>
	)
}
