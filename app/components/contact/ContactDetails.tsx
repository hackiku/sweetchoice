// app/components/contact/ContactDetails.tsx

import React, { useState } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdContentCopy, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { useTranslation } from '~/lib/i18n/useTranslation';

interface ContactDetailInfo {
	icon: typeof MdMail | typeof MdPhone | typeof MdLocationOn;
	text: string;
	action: string;
	expandedInfo?: {
		mainLine: string;
		secondaryLines: string[];
		details: string[];
	};
}

export const contactDetails: ContactDetailInfo[] = [
	{
		icon: MdMail,
		text: 'info@sweetchoice.rs',
		action: 'mailto:info@sweetchoice.rs',
	},
	{
		icon: MdPhone,
		text: '+381 63 111 33 11',
		action: 'tel:+381631113311',
	},
	{
		icon: MdLocationOn,
		text: 'contact.contactDetails.location',
		expandedInfo: {
			mainLine: 'contact.contactDetails.address.mainLine',
			secondaryLines: [
				'contact.contactDetails.address.secondaryLines.city',
				'contact.contactDetails.address.secondaryLines.country'
			],
			details: [
				'contact.contactDetails.address.details.pib',
				'contact.contactDetails.address.details.mb'
			]
		},
		action: 'https://maps.google.com/?q=Nemanjina+7,11080+Belgrade,Serbia',
	},
];

export const ContactDetails: React.FC = () => {
	const { t } = useTranslation();
	const [hoveredContact, setHoveredContact] = useState<number | null>(null);
	const [copiedInfo, setCopiedInfo] = useState<string | null>(null);
	const [expandedAddress, setExpandedAddress] = useState(false);

	const copyToClipboard = (text: string, fullInfo: string = '') => {
		const textToCopy = fullInfo || text;
		navigator.clipboard.writeText(textToCopy).then(() => {
			setCopiedInfo(text);
			setTimeout(() => setCopiedInfo(null), 2000);
		});
	};

	const handleClick = (e: React.MouseEvent, detail: ContactDetailInfo) => {
		if (detail.icon === MdLocationOn) {
			// For address, just let the link open in new tab
			return;
		}
		// For phone and email, prevent default and handle with native actions
		e.preventDefault();
		window.location.href = detail.action;
	};

	const toggleAddress = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setExpandedAddress(!expandedAddress);
	};

	return (
		<div className="space-y-3 mb-3">
			{contactDetails.map((detail, index) => (
				<div
					key={index}
					className="relative"
					onMouseEnter={() => setHoveredContact(index)}
					onMouseLeave={() => {
						setHoveredContact(null);
						if (!expandedAddress) {
							setExpandedAddress(false);
						}
					}}
				>
					<div
						className={`
							bg-[#AE7AFF] 
							rounded-xl border-2 border-black
							transition-all duration-200
							${hoveredContact === index ? 'shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white' : 'hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-white'}
							${copiedInfo === detail.text ? 'bg-green-500' : ''}
						`}
					>
						{/* Main Row */}
						<a
							href={detail.action}
							target={detail.icon === MdLocationOn ? '_blank' : undefined}
							rel={detail.icon === MdLocationOn ? 'noopener noreferrer' : undefined}
							onClick={(e) => handleClick(e, detail)}
							className="flex items-center px-4 py-2 group"
						>
							<detail.icon
								className={`
									flex-shrink-0 w-6 h-6 mr-3 
									${copiedInfo === detail.text ? 'text-white' : 'text-black group-hover:text-[#FF6B6B]'}
									transition-colors duration-200
								`}
							/>

							<div className="flex-grow">
								<span className={`
									text-xl font-bold 
									${copiedInfo === detail.text ? 'text-white' : 'group-hover:text-[#FF6B6B]'}
									transition-all duration-200
									${hoveredContact === index ? 'text-2xl' : ''}
								`}>
									{detail.icon === MdLocationOn && expandedAddress
										? t(detail.expandedInfo?.mainLine || '')
										: detail.text.startsWith('contact.') ? t(detail.text) : detail.text}
								</span>
							</div>

							{/* Copy Button */}
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									copyToClipboard(
										detail.text,
										detail.expandedInfo
											? [detail.text, detail.expandedInfo.mainLine, ...detail.expandedInfo.secondaryLines, ...detail.expandedInfo.details].join('\n')
											: detail.text
									);
								}}
								className={`
									flex-shrink-0 w-8 h-8 flex items-center justify-center
									transition-all duration-200
									${copiedInfo === detail.text
										? 'bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)]'
										: 'hover:bg-gray-100 rounded-full p-1'
									}
								`}
							>
								{copiedInfo === detail.text ? (
									<span className="text-green-500 text-lg">✓</span>
								) : (
									<MdContentCopy className={`text-black group-hover:text-[#FF6B6B]`} />
								)}
							</button>

							{/* Chevron for Address */}
							{detail.icon === MdLocationOn && (
								<button
									onClick={toggleAddress}
									className={`
										ml-2 w-8 h-8 flex items-center justify-center
										border-2 border-black rounded-lg
										transition-all duration-200
										${expandedAddress ? 'bg-[#FF6B6B] text-white' : 'bg-white hover:bg-[#FF6B6B] hover:text-white'}
										shadow-[2px_2px_0px_rgba(0,0,0,1)]
										hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
									`}
								>
									{expandedAddress ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
								</button>
							)}
						</a>

						{/* Expanded Address Content */}
						{detail.expandedInfo && expandedAddress && (
							<div className="px-4 pb-2 space-y-2">
								{detail.expandedInfo.secondaryLines.map((line, i) => (
									<div key={i} className="flex items-center">
										<div className="w-6 h-6 mr-3" />
										<span className={`text-xl font-bold flex-grow ${copiedInfo === detail.text ? 'text-white' : ''}`}>
											{t(line)}
										</span>
									</div>
								))}
								{detail.expandedInfo.details.map((line, i) => (
									<div key={i} className="flex items-center">
										<div className="w-6 h-6 mr-3" />
										<span className={`text-sm font-semibold flex-grow ${copiedInfo === detail.text ? 'text-white' : 'text-gray-700'}`}>
											{t(line)}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};