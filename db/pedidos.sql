-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- object: pedidousr | type: ROLE --
-- DROP ROLE IF EXISTS pedidousr;
CREATE ROLE pedidousr WITH 
	SUPERUSER
	LOGIN
	ENCRYPTED PASSWORD '1010aa';
-- ddl-end --


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: pedido | type: DATABASE --
-- -- DROP DATABASE IF EXISTS pedido;
-- CREATE DATABASE pedido;
-- -- ddl-end --
-- 


-- object: sc2 | type: SCHEMA --
-- DROP SCHEMA IF EXISTS sc2 CASCADE;
CREATE SCHEMA sc2;
-- ddl-end --
ALTER SCHEMA sc2 OWNER TO pedidousr;
-- ddl-end --

-- object: sc3 | type: SCHEMA --
-- DROP SCHEMA IF EXISTS sc3 CASCADE;
CREATE SCHEMA sc3;
-- ddl-end --
ALTER SCHEMA sc3 OWNER TO pedidousr;
-- ddl-end --

SET search_path TO pg_catalog,public,sc1,sc2,sc3;
-- ddl-end --

-- object: public.moeda | type: DOMAIN --
-- DROP DOMAIN IF EXISTS public.moeda CASCADE;
CREATE DOMAIN public.moeda AS money;
-- ddl-end --
ALTER DOMAIN public.moeda OWNER TO pedidousr;
-- ddl-end --

-- object: sc2.produto | type: TABLE --
-- DROP TABLE IF EXISTS sc2.produto CASCADE;
CREATE TABLE sc2.produto (
	id serial NOT NULL,
	nome character varying(250) NOT NULL,
	preco integer NOT NULL DEFAULT 0,
	CONSTRAINT pk_usuario_cp PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE sc2.produto OWNER TO pedidousr;
-- ddl-end --

-- object: sc3.pedido | type: TABLE --
-- DROP TABLE IF EXISTS sc3.pedido CASCADE;
CREATE TABLE sc3.pedido (
	id serial NOT NULL,
	data date NOT NULL DEFAULT current_date,
	cliente_id integer NOT NULL,
	CONSTRAINT pk_usuario_cp PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE sc3.pedido OWNER TO pedidousr;
-- ddl-end --

-- object: sc3.pedido_item | type: TABLE --
-- DROP TABLE IF EXISTS sc3.pedido_item CASCADE;
CREATE TABLE sc3.pedido_item (
	pedido_id integer NOT NULL,
	produto_id smallint NOT NULL,
	qtd smallint NOT NULL DEFAULT 1,
	CONSTRAINT pk_pedido_item PRIMARY KEY (pedido_id,produto_id)

);
-- ddl-end --
ALTER TABLE sc3.pedido_item OWNER TO pedidousr;
-- ddl-end --

-- object: sc2.cliente | type: TABLE --
-- DROP TABLE IF EXISTS sc2.cliente CASCADE;
CREATE TABLE sc2.cliente (
	id serial NOT NULL,
	nome character varying(250) NOT NULL,
	email text NOT NULL unique,
	senha text NOT NULL,
	CONSTRAINT pk_cliente PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE sc2.cliente OWNER TO pedidousr;
-- ddl-end --

-- object: fk_pedido_cliente | type: CONSTRAINT --
-- ALTER TABLE sc3.pedido DROP CONSTRAINT IF EXISTS fk_pedido_cliente CASCADE;
ALTER TABLE sc3.pedido ADD CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente_id)
REFERENCES sc2.cliente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_peditem_pedido | type: CONSTRAINT --
-- ALTER TABLE sc3.pedido_item DROP CONSTRAINT IF EXISTS fk_peditem_pedido CASCADE;
ALTER TABLE sc3.pedido_item ADD CONSTRAINT fk_peditem_pedido FOREIGN KEY (pedido_id)
REFERENCES sc3.pedido (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_peditem_produto | type: CONSTRAINT --
-- ALTER TABLE sc3.pedido_item DROP CONSTRAINT IF EXISTS fk_peditem_produto CASCADE;
ALTER TABLE sc3.pedido_item ADD CONSTRAINT fk_peditem_produto FOREIGN KEY (produto_id)
REFERENCES sc2.produto (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


