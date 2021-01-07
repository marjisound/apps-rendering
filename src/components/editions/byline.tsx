// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { basePx } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';

// ----- Component ----- //

const styles = (kickerColor: string): SerializedStyles => {
	return css`
		display: flex;
		justify-content: space-between;
		svg {
			flex: 0 0 ${basePx(3.75)};
			padding: ${basePx(0.5)};
			padding-top: ${basePx(0.75)};
			width: ${basePx(3.75)};
			height: ${basePx(3.75)};

			circle {
				stroke: ${kickerColor};
			}

			path {
				fill: ${kickerColor};
			}
		}
	`;
};

const bylinePrimaryStyles = (kickerColor: string): SerializedStyles => {
	return css`
		${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
		color: ${kickerColor};
	`;
};

const bylineSecondaryStyles = css`
	${body.medium({ fontStyle: 'italic' })}
`;

interface Props {
	item: Item;
}

const renderText = (byline: DocumentFragment, kickerColor: string): ReactNode =>
	Array.from(byline.childNodes).map((node) => {
		switch (node.nodeName) {
			case 'A':
				return (
					<span css={bylinePrimaryStyles(kickerColor)}>
						{node.textContent ?? ''}
					</span>
				);
			case 'SPAN':
			case '#text':
				return (
					<span css={bylineSecondaryStyles}>
						{node.textContent ?? ''}
					</span>
				);
		}
	});

const Byline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return maybeRender(item.bylineHtml, (byline) => (
		<div css={styles(kickerColor)}>
			<address>{renderText(byline, kickerColor)}</address>
			<span className="js-share-button" role="button">
				<ShareIcon />
			</span>
		</div>
	));
};

// ----- Exports ----- //

export default Byline;
