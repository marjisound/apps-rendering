// ----- Imports ----- //

import { css } from '@emotion/core';
import {
	brandAltBackground,
	brandAltLine,
} from '@guardian/src-foundations/palette';
import { SvgStar } from '@guardian/src-icons';
import { Design } from '@guardian/types';
import { useItemExtras } from 'itemExtrasContext';
import type { FC, ReactNode } from 'react';

// ----- Subcomponents ----- //

const starStyles = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;

	&:nth-of-type(5) {
		padding-right: 2px;
	}
	svg {
		margin: 0 -0.125rem;
		height: 1.75rem;
	}
`;

const emptyStyles = css`
	fill: transparent;
	stroke: ${brandAltLine.primary};
`;

const empty = (
	<span css={[starStyles, emptyStyles]}>
		<SvgStar />
	</span>
);

const full = (
	<span css={starStyles}>
		<SvgStar />
	</span>
);

export const stars = (rating: number): ReactNode =>
	[empty, empty, empty, empty, empty].fill(full, 0, rating);

// ----- Component ----- //

const containerStyles = css`
	position: absolute;
	left: 0;
	bottom: 0;
`;

const StarRating: FC = () => {
	const itemExtras = useItemExtras();
	return itemExtras.design === Design.Review ? (
		<div css={containerStyles}>{stars(itemExtras.starRating)}</div>
	) : null;
};

// ----- Exports ----- //

export default StarRating;
