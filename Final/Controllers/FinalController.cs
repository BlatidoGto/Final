using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Final.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinalController : ControllerBase
    {
        private readonly FinalContext _dbcontext;

        public FinalController(FinalContext context)
        {
            _dbcontext = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<EfinalDTO>>> GetEfinal()
        {
            if (_dbcontext.Efinales == null)
            {
                return NotFound();
            }
            return await _dbcontext.Efinales
                 .Select(x => ItemToDTO(x))
                 .ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<EfinalDTO>> GetEfinal(long id)
        {
            if (_dbcontext.Efinales == null)
            {
                return NotFound();
            }
            var todoItem = await _dbcontext.Efinales.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return ItemToDTO(todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEfinal(long id, EfinalDTO todoDTO)
        {
            if (id != todoDTO.IdEf)
            {
                return BadRequest();
            }

            var todoItem = await _dbcontext.Efinales.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Nombre = todoDTO.Nombre;
            todoItem.Apellidos = todoDTO.Apellidos;
            todoItem.Telefono = todoDTO.Telefono;
            todoItem.Correo = todoDTO.Correo;


            try
            {
                await _dbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (EFinalExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<EfinalDTO>> PostEfinal(EfinalDTO todoDTO)
        {
            var todoItem = new Efinal
            {
                Nombre = todoDTO.Nombre,
                Apellidos = todoDTO.Apellidos,
                Correo = todoDTO.Correo,
                Telefono= todoDTO.Telefono
            };

            _dbcontext.Efinales.Add(todoItem);
            await _dbcontext.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetEfinal),
                new { id = todoItem.IdEf },
                ItemToDTO(todoItem));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEFinal(long id)
        {
            var todoItem = await _dbcontext.Efinales.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _dbcontext.Efinales.Remove(todoItem);
            await _dbcontext.SaveChangesAsync();

            return NoContent();
        }

        private bool EFinalExists(long id)
        {
            return _dbcontext.Efinales.Any(e => e.IdEf == id);
        }

        private static EfinalDTO ItemToDTO(Efinal todoItem) =>
            new EfinalDTO
            {
                IdEf = todoItem.IdEf,
                Nombre = todoItem.Nombre,
                Apellidos = todoItem.Apellidos,
                Correo = todoItem.Correo,
                Telefono = todoItem.Telefono
            };
    }
}