import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Design, Pillar } from '@guardian/types';
import type { Format } from '@guardian/types';
import { createElement as h } from 'react';
import type { ReactElement } from 'react';
import { darkModeCss, darkModeStyles } from 'styles';
import { getThemeStyles } from 'themeStyles';

export const richLinkWidth = '8.75rem';

const richLinkPillarStyles = (kicker: string, inverted: string): string => {
	return `
		border-top: solid 1px ${kicker};

		${darkModeStyles`
			border-top: solid 1px ${neutral[60]};
		`}

		svg {
			fill: white;
			background: ${kicker};
			border-color: ${kicker};
			${darkModeStyles`
				border-color: ${inverted};
				background: ${inverted};
				fill: ${neutral[7]};
			`}
		}

		button {
			color: ${kicker};
			${darkModeStyles`
				color: ${neutral[86]};
			`}
		}
	`;
};

const richLinkStyles = (format: Format): SerializedStyles => {
	const backgroundColor =
		format.design === Design.Comment ? neutral[86] : neutral[97];

	const { kicker: newsKicker, inverted: newsInverted } = getThemeStyles(
		Pillar.News,
	);
	const { kicker: opinionKicker, inverted: opinionInverted } = getThemeStyles(
		Pillar.Opinion,
	);
	const { kicker: sportKicker, inverted: sportInverted } = getThemeStyles(
		Pillar.Sport,
	);
	const { kicker: cultureKicker, inverted: cultureInverted } = getThemeStyles(
		Pillar.Culture,
	);
	const {
		kicker: lifestyleKicker,
		inverted: lifestyleInverted,
	} = getThemeStyles(Pillar.Lifestyle);

	return css`
		background: ${backgroundColor};
		padding: ${remSpace[3]} ${remSpace[3]} ${remSpace[2]};
		border-top: solid 1px ${neutral[60]};
		transition: all 0.2s ease;

		&.js-news {
			${richLinkPillarStyles(newsKicker, newsInverted)}
		}

		&.js-opinion {
			${richLinkPillarStyles(opinionKicker, opinionInverted)}
		}

		&.js-sport {
			${richLinkPillarStyles(sportKicker, sportInverted)}
		}

		&.js-culture {
			${richLinkPillarStyles(cultureKicker, cultureInverted)}
		}

		&.js-lifestyle {
			${richLinkPillarStyles(lifestyleKicker, lifestyleInverted)}
		}

		img {
			width: calc(100% + ${remSpace[6]});
			margin: -${remSpace[3]} 0 0 -${remSpace[3]};
		}

		button {
			background: none;
			border: none;
			${textSans.medium()};
			padding: 0;
			margin: 0;
			display: inline-flex;
			transition: all 0.2s ease;
		}

		svg {
			width: 1.0625rem;
			border-radius: 100%;
			border: solid 1px ${neutral[7]};
			padding: 4px;
			display: inline-block;
			margin-right: ${remSpace[3]};
			transition: all 0.2s ease;
		}

		a {
			display: inline-block;
			text-decoration: none;
			color: ${neutral[7]};
			max-width: 100%;
			word-wrap: break-word;

			h1 {
				margin: 0 0 ${remSpace[4]} 0;
				${headline.xxxsmall({ fontWeight: 'bold' })}
				hyphens: auto;
				${darkModeStyles`
					color: ${neutral[86]};
				`}
			}
		}

		float: left;
		clear: left;
		margin: 0.375rem ${remSpace[4]} ${remSpace[3]} 0;

		width: ${richLinkWidth};
		@media (max-width: 23.4rem) {
			width: 100%;
			box-sizing: border-box;

			img {
				display: none;
			}
		}
		${from.wide} {
			margin-left: calc(
				-${richLinkWidth} - ${remSpace[4]} - ${remSpace[6]}
			);
		}

		${darkModeCss`
			background-color: ${neutral[20]};

            a, h1 {
                color: ${neutral[60]};
            }
        `}
	`;
};

const RichLink = (props: {
	url: string;
	linkText: string;
	format: Format;
}): ReactElement => {
	const { url, linkText, format } = props;
	const webUrl = 'https://www.theguardian.com';

	const articleId = url.includes(webUrl)
		? { 'data-article-id': url.replace(webUrl, '/rendered-items') }
		: {};

	const attributes = {
		css: richLinkStyles(format),
		className: 'js-rich-link',
		...articleId,
	};

	return styledH(
		'aside',
		{ ...attributes },
		styledH('a', { href: url }, [
			h('div', { className: 'js-image', key: `${url}-div` }, null),
			h('h1', { key: `${url}-h1` }, linkText),
			h('button', { key: `${url}-button` }, [
				h(SvgArrowRightStraight, { key: `${url}-svg` }),
				'Read more',
			]),
		]),
	);
};

export default RichLink;
