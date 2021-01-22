// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';
import { articleWidthStyles, sidePadding } from './styles';

// ----- Component ----- //

const styles = (kickerColor: string): SerializedStyles => css`
	${body.medium({ lineHeight: 'tight' })}
	display: flex;
	justify-content: space-between;
	padding-bottom: ${remSpace[4]};
	color: ${text.primary};

	${articleWidthStyles}

	p,
	ul {
		padding-top: ${remSpace[1]};
		margin: 0;
	}

	address {
		font-style: normal;
	}

	svg {
		flex: 0 0 1.875rem;
		margin-top: 0.375rem;
		width: 1.875rem;
		height: 1.875rem;

		circle {
			stroke: ${kickerColor};
		}

		path {
			fill: ${kickerColor};
		}
	}
`;

const interviewStyles = css`
	${sidePadding}
`;

const showcaseStyles = css`
	${headline.xxsmall({ lineHeight: 'tight' })}
	color: ${neutral[20]}
`;

interface Props {
	item: Item;
	shareIcon?: boolean;
}

const noLinks = true;

const getStyles = (format: Format): SerializedStyles => {
	const { kicker: kickerColor } = getThemeStyles(format.theme);
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	if (format.display === Display.Showcase) {
		return css(styles(kickerColor), showcaseStyles);
	}
	return styles(kickerColor);
};

const Standfirst: FC<Props> = ({ item, shareIcon }) => {
	return maybeRender(item.standfirst, (standfirst) => (
		<div css={getStyles(item)}>
			{renderStandfirstText(standfirst, item, noLinks)}
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Standfirst;
