import Image from 'next/image'

export default function Heroes() {
	return (
		<div className='flex flex-col items-center justify-center max-w-5xl'>
			<div className='flex items-center '>
				<div className='relative w-72 h-72 sm:w-80 sm:h-80 md:h-96 md:w-96'>
					<Image
						src='/heroes.svg'
						alt='Heroes'
						fill
						className='object-contain dark:hidden'
					/>
					<Image
						src='/heroes-dark.svg'
						alt='Heroes'
						fill
						className='hidden object-contain dark:block'
					/>
				</div>
				<div className='relative hidden h-96 w-96 md:block'>
					<Image
						src='/reading.svg'
						alt='Reading'
						fill
						className='object-contain dark:hidden'
					/>
					<Image
						src='/reading-dark.svg'
						alt='Reading'
						fill
						className='hidden object-contain dark:block'
					/>
				</div>
			</div>
			<div className='absolute z-10 left-48 top-48 -rotate-12'>
				<Image
					src='/document.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain xl:block dark:hidden'
				/>
				<Image
					src='/document-dark.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain dark:xl:block dark:hidden'
				/>
			</div>
			<div className='absolute z-10 rotate-45 right-48 top-32'>
				<Image
					src='/bulb.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain xl:block dark:hidden'
				/>
				<Image
					src='/bulb-dark.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain dark:xl:block dark:hidden'
				/>
			</div>
			<div className='absolute z-10 -rotate-12 right-64 top-96'>
				<Image
					src='/tools.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain xl:block dark:hidden'
				/>
				<Image
					src='/tools-dark.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain dark:xl:block dark:hidden'
				/>
			</div>
			<div className='absolute z-10 rotate-12 left-64 top-[32rem]'>
				<Image
					src='/graph.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain xl:block dark:hidden'
				/>
				<Image
					src='/graph-dark.svg'
					alt='Document'
					width={128}
					height={128}
					className='hidden object-contain dark:xl:block dark:hidden'
				/>
			</div>
		</div>
	)
}
