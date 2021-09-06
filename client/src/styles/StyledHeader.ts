import styled from "styled-components/macro";

const StyledHeader = styled.header<{ isUser?: boolean }>`
  display: flex;
  align-items: flex-end;
  position: relative;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  background-color: var(--grey);
  /* height: 30vh; */
  max-height: 500px;
  min-height: 250px;

  /* @media (min-width: 768px) {
    margin-right: var(--spacing-xl);
  } */

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 20vh;
    background-color: var(--grey);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), var(--black));
    position: absolute;
    top: 100%inherit;
    z-index: -1;
  }

  .header__inner {
    display: flex;
    align-items: flex-end;
    width: 100%;
    max-width: var(--site-max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);

    @media (min-width: 768px) {
      padding: var(--spacing-xl) var(--spacing-xxl);
    }
  }

  img.header__img {
    width: 20%;
    max-width: 250px;
    min-width: 120px;
    margin-right: var(--spacing-lg);
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    background-color: var(--dark-grey);
    border-radius: ${props => (props.isUser ? "50%" : "0")};

    @media (min-width: 768px) {
      margin-right: var(--spacing-xl);
    }
  }

  .header__name {
    font-size: 35px;
    line-height: 35px;
    width: 100%;

    @media (min-width: 768px) {
      font-size: 80px;
      line-height: 80px;
    }
  }

  .header__overline {
    text-transform: uppercase;
    font-size: var(--fz-xxs);
    font-weight: 700;
    margin-bottom: var(--spacing-xs);
  }

  .header__meta span {
    font-size: var(--fz-sm);
    font-weight: 400;
    line-height: var(--fz-md);
  }

  .header__meta span:not(:first-child)::before {
    content: "•";
    margin: 0 var(--spacing-xxs);
  }
`;

export default StyledHeader;
